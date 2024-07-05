package main

import "fmt"
import "sync"

// type
type car struct {
    name  string
    color string
}

type person struct {
	name string
	age  int
}

// function
func (c *car) setName01(s string) {
	fmt.Printf("setName01: car address: %p\n", c)
	c.name = s
}

func (c car) setName02(s string) {
	fmt.Printf("setName02: car address: %p\n", &c)
	c.name = s
}

// main
func main() {	
	fmt.Println("struct value vs. pointer2 ----------------------------------------")
	toyota := &car{
			name:  "toyota",
			color: "white",
	}

	fmt.Printf("main: car address: %p\n", toyota)
	fmt.Println(toyota.name)

	toyota.setName01("foo")
	fmt.Println(toyota.name)
	toyota.setName02("bar")
	fmt.Println(toyota.name)

	fmt.Println("struct value vs. pointer1 ----------------------------------------")
	// 寫法 1
	p1 := &person{name: "Alice", age: 30}
	fmt.Println("person1-1:", p1.name, p1.age) // Alice 30
	p1.name = "Ocup"
	fmt.Println("person1-2:", p1.name, p1.age) // Ocup 30
	
	// 寫法 2
	p2 := person{name: "Alice", age: 30}
	fmt.Println("person2-1:", p2.name, p2.age) // Alice 30
	pPtr2 := &p2
	p2.name = "May"
	pPtr2.age = 5
	fmt.Println("person2-2:", p2.name, p2.age) // May 5
	
	fmt.Println("pointer ----------------------------------------")
	var int1 int = 1
	var xPtr *int = &int1
	
	fmt.Println("int1:", int1)
	fmt.Println("&int1:", &int1)
	fmt.Println("xPtr:", xPtr)
	fmt.Println("&xPtr:", &xPtr)
	fmt.Println("*xPtr:", *xPtr)
	
	names := []string{"Alice", "Bob", "Carol"}
	var p *[]string = &names
	
	fmt.Println((*p)[0]) // Alice
	fmt.Println((*p)[1]) // Bob
	fmt.Println((*p)[2]) // Carol
	
	fmt.Println("sync.Pool ----------------------------------------")
	var pool = sync.Pool{
			New: func() interface{} {
					return new(int)
			},
	}
	
	v := pool.Get().(*int)
	*v = 42
	fmt.Println(*v) // 輸出: 42
	
	pool.Put(v)
	v2 := pool.Get().(*int)
	fmt.Println(*v2) // 輸出: 42 (v2 是從池中獲取的之前放回的物件)
}