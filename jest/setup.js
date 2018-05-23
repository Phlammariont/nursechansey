const sails = require('sails');
const request = require('supertest');

beforeAll(done => {
  sails.lift({
    environment: 'test',
    datastores: {
      testDB: {
        adapter: 'sails-disk'
      }
    },
    models: {
      datastore: 'testDB',
      migrate: 'safe'
    },
    log: {
      level: 'warn'
    }
  }, err => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    global.app = request(sails.hooks.http.app);
    done(err, sails);
  });
});

afterAll(sails.lower)

beforeEach(async done => {
  // Drops database between each test.  This works because we use
  // the memory database
  await Shift.destroy({})
  await ShiftAssignment.destroy({})
  await User.destroy({})
  await Building.destroy({})
  await Service.destroy({})
  await Planner.destroy({})
  done()
});
