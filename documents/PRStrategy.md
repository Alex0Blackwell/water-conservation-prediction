**What is a Pull Request (PR)?**

Pull requests allows team members to review the changes a git collaborator wants to push to main branch in a Git repository.
It is a way to get feedback from peers on the code changes and is can also be used to run a test and check code mergeability. 

**Initial PR Strategy**

Never push the code directly to `main` branch. Every change in `main` should go via a PR created
from you feature branch against `main` branch. Following steps should be performed before pushing any 
kind of code changes.

- Clone the repostiory on local

- **IMPORTANT NOTE**: _Always create a feature branch before working on you local machine. Open 
terminal from root of git repo folder and check the branch you are on. Don't push anything if you are 
on `main` branch. Create a feature banch using steps given below before working on local machine._ 

- Run `$ git pull --rebase` to pull the latest changes from remote `main` branch.Create a feature branch from 
`main` by running `$ git checkout -B ` where XXX is the ticket associated with the work. 
Please make sure you are on `main` branch while creating the branch.

- Add proper commit message in each commit in your PR `$ git commit -m "XXX - your message with three-four words"

- Push the changes to your remote feature branch `$ git push origin USERNAME-XXX-FEATUREBRANCH`
  
- From GitHub UI create a Pull Request(PR) and add a description in your PR and wait for approval. PRs should not be merged
without approval.


**tldr;**

- Make sure you run a rebase before creating you PR
    ```
    $ git checkout main
    $ git pull --rebase
    $ git checkout USERNAME/XXX-FEATUREBRANCH
    $ git pull --rebase origin main
    ```
  The first two commands pull all the recent changes from remote `main` to you local `main` branch.
  The second two commands will rebase i.e. pull latest updates from `main` to your `local`. This might create 
  merge conflicts that will need manual resolution on your local feature branch. In case of merge conflict you can 
  abort rebase by running `git rebase --abort`. After rebase runs successfully, changes can only be forcefully pushed with 
  `git push origin -f USERNAME/BUD-XXX-FEATUREBRANCH`.