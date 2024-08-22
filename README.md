# TaskPilot

Welcome to Task Board, a streamlined and intuitive Kanban board application designed to help you manage your tasks effortlessly. Whether you're juggling personal projects, professional duties, or collaborative efforts, our app offers a powerful and user-friendly interface to keep you organized and on track.

## User Story
AS A project team member with multiple tasks to organize<br>
I WANT a task board <br>
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly

## Acceptance Criteria
GIVEN a task board to manage a project
* WHEN I open the task board<br>
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
* WHEN I click on the button to define a new task<br>
THEN I can enter the title, description and deadline date for the new task into a modal dialog
* WHEN I click the save button for that task<br>
THEN the properties for that task are saved in localStorage
* WHEN I drag a task to a different progress column<br>
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
* WHEN I click the delete button for a task<br>
THEN the task is removed from the task board and will not be added back after refreshing
* WHEN I refresh the page<br>
THEN the saved tasks persist

## Go to my project
  
You can check out my repository [here](https://github.com/VanZittle/TaskPilot). Or take a look at my deployed application [here]().

## License
![GitHub](https://img.shields.io/github/license/VanZittle/TaskPilot?style=for-the-badge)<br> Go to license [here](https://github.com/VanZittle/TaskPilot/blob/main/LICENSE)
  
Markdown generated with **[README Creator](https://github.com/VanZittle/module9-challenge-ReadmeGenerator)**