##### <!-- 收起 -->

<!----------- ref start ----------->

[30 天精通 Git 版本控管]: https://ithelp.ithome.com.tw/users/20004901/ironman/525

<!------------ ref end ------------>

# Git

> DATE: 5, 6 (2024)
> REF: [30 天精通 Git 版本控管]

## <mark># TODO: 未整理</mark>

- `git cat-file -p <HASH ID>`

  - 查看該物件內容，hashID 會是該物件檔案名稱
  - 也可直接查看 ref，EX. `git cat-file -p HEAD`

- 合併三個以上分支，就會有三個以上的 parent。那什麼情況會造成合併三條以上分支？

  - EX. `git stash save -u`

    - 這個做法會分別將 worktree、index(untracked)、tracked 存成一個 stash
    - 則此時的表現方式是該 stash 會有三個 parent，分別為那三個狀態

    ```sh
    $ git cat-file -p stash
    tree 6381dc317d7a3c2cac9fd0bf383b6b5427b633bb     # worktree  (unmodified/modified)
    parent d5301505f50aa16b1f12cc195897185334c4f044   # HEAD
    parent f07891d84a88efc08f3f305dc59d255a4c1bb68a   # index     (staged)
    parent 18f5efab303dbb7920ae15e71e5b3e62b0381d16   # untracked

    WIP on master: d530150 TEST git 1
    ```

- 細節觀察：

  - stash，在 refs/ 中只會紀錄紀錄一個最新的 stash，也就是 stash@{0}。其他則是記錄在 logs/refs/stash
  -

## # 簡介

## # 基本

<!--  -->

- <details close>
  <summary></summary>

  -

  </details>

## # 問題

<!-- 關鍵字 -->

- <details close>
  <summary>關鍵字</summary>

  - Social Coding
  -

  </details>

## # 補充

<!-- 注意事項 -->

- 注意事項：

  <!-- 關於指令選用 -->

  - <details close>
    <summary>關於指令選用</summary>

    - 我認為推薦使用的指令隨更新不斷在進化，所以有些相同公用的指令，可以參考 shell 上給的回饋來使用

      > EX. `git status` 後會顯示 (use "`git restore --staged <file>...`" to unstage)，以前的版本曾經是 (use "`git reset HEAD <file>...`" to unstage)，但可以盡量使用最新版本建議方式來完成

    - 或是在觀念非常清楚後，學習使用 GUI，指令改 GUI 也會跟著更新，而使用 GUI 需要的是清楚的概念

    </details>

<!-- 小技巧 -->

- 小技巧：

  <!--  -->

  - <details close>
    <summary></summary>

    -

    </details>

<!-- 小工具 -->

- 小工具：

  <!--  -->

  - <details close>
    <summary></summary>

    -

    </details>

<!-- 補充學習 -->

- 補充學習：

  <!--  -->

  - <details close>
    <summary></summary>

    -

    </details>

---

## # 踩雷實錄

<!--  -->

- <details close>
  <summary></summary>

  -

  </details>

---

## # 延伸討論

<!--  -->

- <details close>
  <summary></summary>

  -

  </details>

---
