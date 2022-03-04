# [Daily Twitter - with 280 characters](https://twitter.com/chiawei37995568)

# 2.22.2022

> FIRST POST :)
>
> I switched to Software Engineer for 2 years.
> Recently study in data structure & algorithm.
>
> And join a study club, by now study in Block Chain. Just start from the first Bitcoin paper by Satoshi Nakamoto.
>
> I think more things will get the solution by Block Chain~

> As mentioned above
>
> Our last book was "Information Architecture For the Web and Beyond".
>
> I think that's more like UX area in book, but by that I learned what key point designer care about & some methods to work through all the departments.
>
> And Document is very IMPORTANT :)

> When to use #LinkedList instead of Array?
>
> If you have a data with known size and > NEED to insert and remove frequently,
> but DON'T need to random access any item and DON'T need speed when iterating.
>
> Use #LinkedList !

[See More in GitHub](https://github.com/ocup0311/Algorithm/blob/master/note/6_Linear%20Data%20Structure)

# 2.23.2022

> #JavaScript #Array
>
> The discussion changed me
> FROM always use array literal [ ] to create js array
> TO only when creating known-length array with copy items by
> new Array(length).fill(item)
>
> To create [ ] then push will need capacity growing too many times

[When to use new Array](https://coderwall.com/p/h4xm0w/why-never-use-new-array-in-javascript)

# 2.24.2022

> #JavaScript #sort #V8
>
> Before, for efficacy use Insertion Sort when length < 10 & Quick Sort when > 10.
> Let the result go unstable when > 10.
>
> Then change to Timsort in V8 v7.0 / Chrome 70.
>
> Finally it's all STABLE sorting now :)

[When to use new Array](https://v8.dev/blog/array-sort)

# 2.25.2022

#BinarySearchTree #BST

> #BinarySearchTree #BST
>
> The traversal ways of Binary Search Tree are Breadth First Tree Traversal(BFT) & Depth First Tree Traversal(DFT).
> There are 3 ways for DFT (PreOrder, InOrder, PostOrder)
>
> If you use InOrder way, you'll get the sorted result!

[See More in GitHub](https://github.com/ocup0311/Algorithm/blob/master/note/7_Tree)

# 2.26.2022

> #JavaScript
>
> [Tool](http://latentflip.com/loupe/)
>
> ↑ ↑ ↑ A cool tool easy to learn #JavaScript runtime.
>
> I saw it again from the article below :)
>
> A simple description for #JavaScript runtime in bowser & Nodejs.

[JavaScript at runtime](https://github.com/Fandix/Fandix.github.io-/blob/main/source/_posts/NodeJS/how-dose-javascript-work.md)

# 2.28.2022

> #JavaScript #JSMap
>
> #JavaScript Object's key can only be a string. We can use Map instead for other key type.
>
> ex:
> const map = new Map()
> const obj = { x: 1 }
> map.set(obj, 5)
> console.log(map.get(obj))
> // 5
> console.log(map)
> // Map(1) { { x: 1 } => 5 }

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

# 3.1.2022

> #Brave #BAT
>
> Use Brave browser to earn ad fee as BAT for yourself.
> And you can sponsor who you really like.
> You also can add your channel such as Twitter and Github to Brave.
> Let others can sponsor you too :)

[ref1](https://publishers.basicattentiontoken.org/) [ref2](https://www.hankexploring.com/%E8%B3%BA%E9%8C%A2-brave%E7%80%8F%E8%A6%BD%E5%99%A8-%E8%B3%BA%E9%8C%A2/)

# 3.3.2022

> #Dijkstra's #Algorithm #ShortedPath
>
> Sometimes udemy teacher can't kwon what's bug with him.
> I show bug for his #Dijkstra's Algorithm :)
> I think the distance changed will NOT trigger heap.
> If the node in middle of tree, that'll may be NOT a minHeapTree anymore.
>
> I found two methods to resolve it: sort again OR enqueue one more after that.

  <div style="display: flex; flex-direction: column; padding: 10%; justify-content: center;" >
    <img src="/Diary/src/image/Dijkstra's_Algorithm_Question1.png" alt="Dijkstra's_Algorithm_Question.png" />
    <img src="/Diary/src/image/Dijkstra's_Algorithm_Question2.png" alt="Dijkstra's_Algorithm_Question.png" />
  </div>

[Teacher's code](/Diary/src/code/Dijkstra_FromTeacher.js)

[see more in my Github](https://github.com/ocup0311/Algorithm/blob/e78205f4256de25c1e3a316d7dc0d0f76205e7c3/code/graph/Digraph.js)
