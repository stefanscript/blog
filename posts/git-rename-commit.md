---
title: How to rename a git commit
date: "2020-12-12"
author: stefan
---

It's ***important to note*** that if you have already pushed to origin this will create a lot of problems for other 
users of the repo.

To change the message of the last commit (if you haven't pushed to origin):

    git commit --amend -m "the new message here"
    
To change the message of multiple commits or a particular previous commit (again if you haven't pushed to origin):
 
    // use this and follow the steps, replace n with the number of commits you want to change/consider 
    git rebase -i HEAD~n

References: 

https://stackoverflow.com/questions/179123/how-to-modify-existing-unpushed-commit-messages
