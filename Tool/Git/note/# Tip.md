# [git bisect 找第一個有問題的 Commit](https://blog.puckwang.com/posts/2021/use-git-bisect-debug/)

# [Is it possible to move/rename files in Git and maintain their history?](https://stackoverflow.com/questions/2314652/is-it-possible-to-move-rename-files-in-git-and-maintain-their-history)

# 移除 commit 內容，但不更改歷史

> REF: [How can I revert multiple Git commits?](https://stackoverflow.com/questions/1463340/how-can-i-revert-multiple-git-commits)

- EX. 當不小心將「未準備要 merge 的 branch」merge 到 master 並 push 後，且不想修改此錯誤歷史
- 解法：

  - 一次 revert 數個 commit 直到想呈現的 commit
  - 再疊上一個新 commit 標註所做的 revert 行為

  ```shell
  $ git revert --no-commit <ID>..
  $ git commit -m "<MESSAGE>"
  ```

  - `e65aa22..` 等同於 `2e38833, e57c112, 41e2903`
  - 若不加 `--no-commit`，則每個 revert 都需要 commit 一次，也就是範例中會需要三次 commit
  - 因為 `--no-commit`，所以最後須自己再加一個 commit 說明此動作
  - `git revert e65aa22` 只會 revert `e65aa22`

  ```shell
  # EX.

  # 在 2e38833 當下進行
  $ git revert e65aa22..
  $ git commit -m  "[REVERT] 移除 2e38833 ~ 41e2903 的內容"

  # 以下為 git log --oneline 結果
  72ff826 (HEAD -> master) [REVERT] 移除 2e38833 ~ 41e2903 的內容
  2e38833 [ADD] test5
  e57c112 [ADD] test4
  41e2903 [ADD] test3
  e65aa22 [ADD] something here
  ```
