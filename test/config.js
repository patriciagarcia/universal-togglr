'use strict';

module.exports = {
  email: 'drhorrible@evil_league_of_evil.com',
  startTime: '00:00:00',
  fields: {
    'Start date': {
      column: 'Date',
      dateFormat: 'YYYY-MM-DD'
    },
    'Description': {
      column: 'Note'
    },
    'Project': {
      column: 'Project',
      translations: {
        'Conquer the world': 'World domination'
      },
      rules: [
        {
          value: 'Moon domination',
          conditions: [
            {
              origColumn: 'Project',
              value: 'Expand to the moon'
            }
          ]
        }
      ]
    },
    'Client': {
      column: 'Project',
      translations: {
        'Conquer the world': 'Earth Evil Corp',
        'Expand to the moon': 'Moon Evil Corp'
      }
    },
    'Task': {
      column: 'Note',
      translations: {
        'Super villain sprint planning': 'Agiling',
        'Backlog': 'Agiling',
        'Villain school coaching': 'Give back to the community',
        'Kick off': 'Meetings',
        'Remove all cat gifs from the Internet': '#Create chaos'

      }
    },
    'Tags': {
      column: 'Service',
      translations: {
        meeting: 'meeting',
        stuff: 'implementing',
        support: 'community',
        'PMing': 'project mgmt'
      }
    }
  }
};
