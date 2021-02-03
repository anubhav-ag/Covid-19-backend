'use strict';

module.exports = {up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('Clinics', [{
    clinic_name: 'Outram Polyclinic',
    clinic_address: '3 Second Hospital Ave, #02-00 Health Promotion Board Building, Singapore 168937',
    created_at: Sequelize.fn('NOW'),
    updated_at: Sequelize.fn('NOW')
  },
  {
    clinic_name: 'Punggol Polyclinic',
    clinic_address: '681 Punggol Dr, #02-01, Singapore 820681',
    created_at: Sequelize.fn('NOW'),
    updated_at: Sequelize.fn('NOW')
  },
  {
    clinic_name: 'Bedok Polyclinic',
    clinic_address: 'Heartbeat@ #02-01, #03-01, Singapore 469662, 11 Bedok North Street 1',
    created_at: Sequelize.fn('NOW'),
    updated_at: Sequelize.fn('NOW')
  },
  {
    clinic_name: 'Ang Mo Kio Polyclinic',
    clinic_address: '21 Ang Mo Kio Central 2, Singapore 569666',
    created_at: Sequelize.fn('NOW'),
    updated_at: Sequelize.fn('NOW')
  },
  
  {
    clinic_name: 'Tampines Polyclinic',
    clinic_address: '1 Tampines Street 41, Singapore 529203',
    created_at: Sequelize.fn('NOW'),
    updated_at: Sequelize.fn('NOW')
  },
  {
    clinic_name: 'Pasir Ris Polyclinic',
    clinic_address: '1 Pasir Ris Drive 4, #01-11, Singapore 519457',
    created_at: Sequelize.fn('NOW'),
    updated_at: Sequelize.fn('NOW')
  },
  {
    clinic_name: 'Hougang Polyclinic',
    clinic_address: '89 Hougang Ave 4, Singapore 538829',
    created_at: Sequelize.fn('NOW'),
    updated_at: Sequelize.fn('NOW')
  },
  {
    clinic_name: 'Woodlands Polyclinic',
    clinic_address: '10 Woodlands Street 31, Singapore 738579',
    created_at: Sequelize.fn('NOW'),
    updated_at: Sequelize.fn('NOW')
  },
  {
    clinic_name: 'Queenstown Polyclinic',
    clinic_address: '580 Stirling Rd, Singapore 148958',
    created_at: Sequelize.fn('NOW'),
    updated_at: Sequelize.fn('NOW')
  }
  ]);
},
down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('Clinics', null, {});
}
};