module.exports = {
  name: 'ch01',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ch01',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
