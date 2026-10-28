const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { Module } = require('node:module');

// Run the actual reducer and its pure TypeScript dependencies without the UI.
function loadTypeScript(file) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const loaded = new Module(file, module);
  const originalRequire = loaded.require.bind(loaded);
  loaded.require = (id) => id.startsWith('.')
    ? loadTypeScript(path.resolve(path.dirname(file), `${id}.ts`))
    : originalRequire(id);
  loaded._compile(compiled, file);
  return loaded.exports;
}
const { demoReducer: reduce, isDemoState } = loadTypeScript(path.join(__dirname, '../src/data/demo-state.ts'));
const { validateAttendance, formatAttendanceTime } = loadTypeScript(path.join(__dirname, '../src/utils/attendanceValidation.ts'));
let state = {
  username: '', role: null,
  sessions: [{ id: 'S1', practicalName: 'Test', className: 'A', date: '2026-10-27', startTime: '08:00', endTime: '10:00', status: 'Belum Dibuka' }],
  attendance: [],
};
const attend = { type: 'attend', sessionId: 'S1', time: '08:05:00' };
const liveSession = { ...state.sessions[0], status: 'Berlangsung' };
const validInput = { studentId: '12345', role: 'Praktikan', session: liveSession, attendance: [] };
assert.deepEqual(validateAttendance(validInput), { valid: true });
for (const [changes, code] of [
  [{ studentId: '   ' }, 'identity'],
  [{ role: null }, 'role'],
  [{ role: 'Asisten' }, 'role'],
  [{ session: undefined }, 'session'],
  [{ session: state.sessions[0] }, 'unopened'],
  [{ session: { ...liveSession, status: 'Selesai' } }, 'closed'],
  [{ attendance: [{ sessionId: 'S1', studentId: '12345' }] }, 'duplicate'],
]) {
  const result = validateAttendance({ ...validInput, ...changes });
  assert.equal(result.valid, false);
  assert.equal(result.code, code);
  assert.ok(result.message.length > 0);
}
assert.equal(validateAttendance({ ...validInput, attendance: [{ sessionId: 'S1', studentId: 'other' }] }).valid, true, 'Other students do not block attendance');
assert.equal(validateAttendance({ ...validInput, attendance: [{ sessionId: 'S2', studentId: '12345' }] }).valid, true, 'Other sessions do not block attendance');
assert.deepEqual(validInput.attendance, [], 'Validation does not mutate input');
assert.equal(formatAttendanceTime(new Date('2026-10-28T01:05:09Z')), '08:05:09', 'Attendance uses Jakarta time independent of device timezone');
assert.equal(formatAttendanceTime(new Date('2026-10-28T17:00:00Z')), '00:00:00', 'Jakarta midnight uses a 24-hour clock');
assert.equal(reduce({ ...state, username: ' ', role: 'Praktikan', sessions: [liveSession] }, attend).attendance.length, 0, 'Whitespace-only identity is rejected');
assert.equal(reduce({ ...state, username: '12345', role: 'Praktikan', sessions: [] }, attend).attendance.length, 0, 'Missing session is rejected');
assert.equal(reduce(state, attend), state, 'Anonymous attendance is rejected');
state = reduce(state, { type: 'login', username: ' 12345 ' });
assert.equal(state.username, '12345');
state = reduce(state, { type: 'role', role: 'Praktikan' });
assert.equal(reduce(state, { type: 'open', sessionId: 'S1' }), state, 'Students cannot open sessions');
assert.equal(reduce(state, attend), state, 'Unopened session rejects attendance');
state = reduce(state, { type: 'role', role: 'Asisten' });
state = reduce(state, { type: 'open', sessionId: 'S1' });
assert.equal(state.sessions[0].status, 'Berlangsung');
assert.equal(reduce(state, attend), state, 'Assistants cannot register student attendance');
state = reduce(state, { type: 'role', role: 'Praktikan' });
state = reduce(state, attend);
assert.equal(state.attendance.length, 1);
assert.equal(state.attendance[0].studentId, '12345');
assert.equal(state.attendance[0].attendanceTime, '08:05:00', 'Attendance retains the confirmation time');
const firstRecord = state.attendance[0];
let secondStudent = reduce(state, { type: 'login', username: '67890' });
secondStudent = reduce(secondStudent, { type: 'role', role: 'Praktikan' });
secondStudent = reduce(secondStudent, attend);
assert.equal(secondStudent.attendance.length, 2, 'Different students may attend the same session');
assert.equal(secondStudent.attendance.filter((record) => record.studentId === '67890').length, 1, 'History can isolate the active identity');
assert.equal(secondStudent.attendance[0], firstRecord, 'A new attendance preserves existing records');
assert.equal(reduce(state, attend), state, 'Duplicate attendance is rejected');
assert.equal(reduce(state, { type: 'close', sessionId: 'S1' }), state, 'Students cannot close sessions');
state = reduce(state, { type: 'role', role: 'Asisten' });
assert.equal(state.attendance[0], firstRecord, 'Switching roles preserves attendance for the assistant recap');
state = reduce(state, { type: 'close', sessionId: 'S1' });
assert.equal(state.sessions[0].status, 'Selesai');
state = reduce(state, { type: 'open', sessionId: 'S1' });
assert.equal(state.sessions[0].status, 'Selesai', 'Closed sessions stay closed');
state = reduce(state, { type: 'login', username: '67890' });
state = reduce(state, { type: 'role', role: 'Praktikan' });
assert.equal(reduce(state, attend), state, 'Closed session rejects new attendance');
assert.equal(isDemoState(JSON.parse(JSON.stringify(state))), true);
assert.equal(isDemoState({ ...state, sessions: [{}] }), false);
state = reduce(state, { type: 'logout' });
assert.equal(state.username, '');
assert.equal(state.role, null);
assert.equal(state.attendance.length, 1, 'Logout preserves shared demo records');
console.log('Demo state checks passed: shared validation, Jakarta time, identity isolation, role restrictions, session lifecycle, duplicate prevention, persistence shape, logout.');
