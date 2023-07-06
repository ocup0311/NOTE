[tideman]: https://cs50.harvard.edu/x/2022/psets/3/tideman/
[ref1]: https://joseph28robinson.medium.com/cs50-pset3-tideman-87f22f0f0bc3
[ref2]: https://gist.github.com/Saarth-Jain/a8b16b0ea04d7c6b1dbb37cd7bb3b037

# # [Tideman]

- <mark>TODO:Q</mark> 特殊情況：

  - 在以下情況中，執行結果似乎有問題，但已經完全通過 check50。

    ```sh
    特殊情況：
    共三位候選人：A B C
    共三位投票者：
        Rank 1: A
        Rank 2: B
        Rank 3: C

        Rank 1: B
        Rank 2: C
        Rank 3: A

        Rank 1: C
        Rank 2: A
        Rank 3: B
    投票結果：C

    --> 疑問：不應該算平手嗎？
    ```

  - 網路上其他人的程式碼有同樣的問題：[REF1] | [REF2]
