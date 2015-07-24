'use strict';

module.exports = {
  email: 'drhorrible@evil_league_of_evil.com',
  startTime: '00:00:00',
  descriptionField: 'Note',
  dateField: 'Date',
  dateFormat: 'YYYY-MM-DD',
  durationField: 'Hours',
  columns: {
    'Project': [
      {
        value: 'World domination',
        conditions: [
          {
            origColumn: 'Project',
            value: 'Conquer the world'
          }
        ]
      },
      {
        value: 'Moon domination',
        conditions: [
          {
            origColumn: 'Project',
            value: 'Expand to the moon'
          }
        ]
      }
    ],
    'Client': [
      {
        value: 'Earth Evil Corp',
        conditions: [
          {
            origColumn: 'Project',
            value: 'Conquer the world'
          }
        ]
      },
      {
        value: 'Moon Evil Corp',
        conditions: [
          {
            origColumn: 'Project',
            value: 'Expand to the moon'
          }
        ]
      }
    ],
    'Task': [
      {
        value: 'Agiling',
        conditions: [
          {
            origColumn: 'Note',
            value: 'Super villain sprint planning'
          }
        ]
      },
      {
        value: 'Agiling',
        conditions: [
          {
            origColumn: 'Note',
            value: 'Backlog'
          }
        ]
      },
      {
        value: 'Give back to the community',
        conditions: [
          {
            origColumn: 'Note',
            value: 'Villain school coaching'
          }
        ]
      },
      {
        value: 'Meetings',
        conditions: [
          {
            origColumn: 'Note',
            value: 'Kick off'
          }
        ]
      },
      {
        value: '#Create chaos',
        conditions: [
          {
            origColumn: 'Note',
            value: 'Remove all cat gifs from the Internet'
          }
        ]
      },
    ],
    'Tags': [
      {
        value: 'meeting',
        conditions: [
          {
            origColumn: 'Service',
            value: 'meeting'
          }
        ]
      },
      {
        value: 'implementing',
        conditions: [
          {
            origColumn: 'Service',
            value: 'stuff'
          }
        ]
      },
      {
        value: 'community',
        conditions: [
          {
            origColumn: 'Service',
            value: 'support'
          }
        ]
      },
      {
        value: 'project mgmt',
        conditions: [
          {
            origColumn: 'Service',
            value: 'PMing'
          }
        ]
      }
    ]
  }
};
