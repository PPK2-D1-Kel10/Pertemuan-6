const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const { Module } = require('node:module');

// Run the actual reducer without bundling React Native or the UI.
const file = path.join(__dirname, '../src/data/demo-state.ts');
const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const reducerModule = new Module(file, module);
reducerModule._compile(compiled, file);
const { demoReducer: reduce, isDemoState } = reducerModule.exports;
let state = {
  username: '', role: null,
  sessions: [{ id: 'S1', practicalName: 'Test', className: 'A', date: '2026-10-27', startTime: '08:00', endTime: '10:00', status: 'Belum Dibuka' }],
  attendance: [],
};
const attend = { type: 'attend', sessionId: 'S1', time: '08:05:00' };
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
assert.equal(reduce(state, attend), state, 'Duplicate attendance is rejected');
assert.equal(reduce(state, { type: 'close', sessionId: 'S1' }), state, 'Students cannot close sessions');
state = reduce(state, { type: 'role', role: 'Asisten' });
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
console.log('Demo state checks passed: role restrictions, session lifecycle, duplicate prevention, persistence shape, logout.');
