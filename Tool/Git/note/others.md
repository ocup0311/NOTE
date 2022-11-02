<style> 
.imgBox{
  display: flex; 
  flex-direction: column; 
  margin: 5%; 
  justify-content: center;
  border: 2px solid black;
}
</style>

<!--  style  -->

###### <!-- ref -->

[the git & github bootcamp]: https://www.udemy.com/course/git-and-github-bootcamp/learn/lecture/24507864?start=0#overview

 <!-- ref -->

# 隨筆

## 1. [The Git & Github Bootcamp]

- 有些人覺得 `git checkout` 做太多事了，因此誕生 `git switch` 來專門切換 `branch`

- `git diff`

  - `git diff`："Staging Area" | "Working Directory"
  - `git diff <COMMIT>`："特定 COMMIT" | "Working Directory"
  - `git diff --staged` (`--cached` 同)： "last commit" | "Staging Area"
  - `git diff <pointer1>..<pointer2>`："pointer1" | "pointer2"

- `git stash apply`：叫出 stash 後，仍保留該 stash

- `git push -u`

  - `upstream`
  - 連結上特定 remote

    - 連結上以後，在該分支使用 `git push`，就會將該分支 push 到連結的 remote

  - 寫入 config： `branch.<branchName>.remote=<remoteName>`
    - EX. `branch.master.remote=origin`

---

## 2. []

-
