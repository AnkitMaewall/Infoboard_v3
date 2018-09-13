const axios = require('axios');
const todoistjs = require('todoist-js');

const todoist = todoistjs.TodoistAPI('82e5c511db20ce803a042ce039ece5dd31fd29ca');

todoist.completed.get_stats().then((stats) => {
  console.log(stats.karma_trend);
});

/* function todoistService() {
  function getProjectList() {
    return new Promise((resolve, reject) => {
      axios.get('https://beta.todoist.com/API/v8/projects')
        .then((response) => {
          
        })
        .catch((error) => {
          reject(error);
          console.log(error);
        });
      resolve({ list: 'our list' });
    });
  }
  function getListbyProject() {
    return ['Hi', 'Anushka'];
  }
  return {
    getProjectList,
    getListbyProject
  };
} */

module.exports = todoistService();
