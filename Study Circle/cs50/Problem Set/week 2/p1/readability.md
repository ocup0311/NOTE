[Reading Level](https://cs50.harvard.edu/x/2021/psets/2/readability/)

- 公式：`index = 0.0588 * L - 0.296 * S - 15.8`
  - `L`: letters / 100 words
  - `S`: sentences / 100 words
  - `words`: 空白區隔開來的為一個單字
  - `letters`: 只包含英文字母
  - `sentences`: 只包含結尾是 `!` `.` `?`

```txt
EX.
input: Congratulations! Today is your day. You're off to Great Places! You're off and away!

L: (15 + 5 + 2 + 4 + 3 + 5 + 3 + 2 + 5 + 6 + 5 + 3 + 3 + 4) / 14 * 100 = 464.29
S: 4 / 14 * 100 = 28.57
index: 0.0588 * 464.29 - 0.296 * 28.57 - 15.8 = 3.04

output: Grade 3
```

```txt
EX.
input: Congratulations! Today is your day. You're off to Great Places! You're off and away!
output: Grade 3

input: Harry Potter was a highly unusual boy in many ways. For one thing, he hated the summer holidays more than any other time of year. For another, he really wanted to do his homework, but was forced to do it in secret, in the dead of the night. And he also happened to be a wizard.
output: Grade 5

input: As the average number of letters and words per sentence increases, the Coleman-Liau index gives the text a higher reading level. If you were to take this paragraph, for instance, which has longer words and sentences than either of the prior two examples, the formula would give the text an eleventh grade reading level.
output: Grade 11
```
