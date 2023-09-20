# Welcome to lmsGenie contributing guide

Read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## Getting started

To get an overview of the project, read the [README](README.md). Here are the steps to contribute,

### 1. Create a new issue

You can either pick an existing issue, or if you spot a new feature, a bug, or an improvment, so you can open a new issue using a relevant issue form.
- [Create a Frontend issue](https://github.com/lmsGenie/client/issues/new/choose)
- [Create a Backend issue](https://github.com/lmsGenie/server/issues/new/choose)

Note: Before making a new issue please [search if an issue already exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments).
- [Frontend Issues](https://github.com/lmsGenie/client/issues)
- [Backend Issues](https://github.com/lmsGenie/server/issues)

### 2. Fork the repository
There are two ways,

- Using GitHub Desktop:
  - [Getting started with GitHub Desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/getting-started-with-github-desktop) will guide you through setting up Desktop.
  - Once Desktop is set up, you can use it to [fork the repo](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/cloning-and-forking-repositories-from-github-desktop)!

- Using the command line:
  - [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo#fork-an-example-repository) so that you can make your changes without affecting the original project until you're ready to merge them.

### 3. Make Changes
Create a working branch and start with your changes!
```
git checkout -b ui/feature-name     # creates a new branch "feature-name"
git add .                           # add changes to stage
git commit                          # Commit the changes once you are happy with them.
git push                            # Push your changes to github
```
Note: Make sure your branch is upto date with main, otherwise run `git pull origin main`.

### 4. Pull Request
When you're finished with the changes, create a pull request, also known as a PR.

- Fill the PR template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request.
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.

Once you submit your PR, a team member will review your proposal. We may ask questions or request additional information.

- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://github.com/skills/resolve-merge-conflicts) to help you resolve merge conflicts and other issues.

### 5. Your PR is merged!

Congratulations :tada::tada: The lmsGenie team thanks you :sparkles:.

## Guidelines for Contributing 
Please follow below recommended practices,
### For frontend.
- Use customized theme colors whenever possible. (tailwind.config.ts)
- Use sprite icons whenever possible. [How to use Sprite Icons](https://github.com/orgs/lmsGenie/discussions/41#discussioncomment-7049981)
- Define types at early stage of development.
- Make sure UI is responsive.
- Make sure of Dark Mode UI.

### For backend
- Define types at early stage of development.
- While defining any controller logic, try covering all edge cases.
- Make sure request status codes are used correctly.
