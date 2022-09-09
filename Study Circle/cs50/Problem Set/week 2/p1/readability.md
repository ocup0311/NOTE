[Reading Level](https://cs50.harvard.edu/x/2021/psets/2/readability/)

- 公式：`index = 0.0588 * L - 0.296 * S - 15.8`
  - `L`: letters / 100 words
  - `S`: sentences / 100 words
  - `words`: 空白區隔開來的為一個單字
  - `letters`: 只包含英文字母
  - `sentences`: 只包含結尾是 `!` `.` `?` (忽略 `Mr.` `Mrs.` ...等等)

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

# 補充：

- 若運算後會轉型，則必須在運算前，先進行轉型

```c
// A. 結果為先以原型別(int)運算，再轉型為 float
int x = 3;
int y = 5;
float z = x / y; // 0.000000


// B. 一開始就定義為 float
float x = 3;
float y = 5;
float z = x / y; // 0.600000

// C. 運算前轉為 float（認為此方法為 佳）
int x = 3;
int y = 5;
float z = (float)x / (float)y; // 0.600000
```

# 測試用範例

- (Before Grade 1)

  ```txt
  One fish. Two fish. Red fish. Blue fish.
  ```

- (Grade 2)

  ```txt
  Would you like them here or there? I would not like them here or there. I would not like them anywhere.
  ```

- (Grade 3)

  ```txt
  Congratulations! Today is your day. You're off to Great Places! You're off and away!
  ```

- (Grade 5)

  ```txt
  Harry Potter was a highly unusual boy in many ways. For one thing, he hated the summer holidays more than any other time of year. For another, he really wanted to do his homework, but was forced to do it in secret, in the dead of the night. And he also happened to be a wizard.
  ```

- (Grade 7)

  ```txt
  In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.
  ```

- <mark>(Grade 8) 再研究</mark>

  ```txt
  Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversation?"
  ```

- (Grade 8)

  ```txt
  When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem's fears of never being able to play football were assuaged, he was seldom self-conscious about his injury. His left arm was somewhat shorter than his right; when he stood or walked, the back of his hand was at right angles to his body, his thumb parallel to his thigh.
  ```

- (Grade 9)

  ```txt
  There are more things in Heaven and Earth, Horatio, than are dreamt of in your philosophy.
  ```

- (Grade 10)

  ```txt
  It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.
  ```

- (Grade 16+)

  ```txt
  A large class of computational problems involve the determination of properties of graphs, digraphs, integers, arrays of integers, finite families of finite sets, boolean formulas and elements of other countable domains.
  ```
