package main
import "fmt"

func test() (int, string){
	return 10, "gg"
}

type Person struct {
	name string
	age int
}

func main() {	
	// 77777
	var arr [5]int = [5]int { 1, 2, 3, 4, 5 }

	for i, v:=range(arr){
		fmt.Println("Index is", i, "Value is", v)
	}

	// 666666
	var p1 Person = Person{ "Ocup", 18 }
	var p2 Person = Person{ age: 20, name: "May" }

	fmt.Println(p1.name, p2.name)

	// 11111
	var int1 int = 1
	var str1 string = "88"
	var str3 rune
	var int2 int
	var abc int
	str2 := "str2"
	str2 = "122"

	int1 = 99

	fmt.Println(int1)
	fmt.Println(int2)
	fmt.Println(str1)
	fmt.Println(str2)
	fmt.Println(str3)
	fmt.Print("輸入：")
	fmt.Scanln(&abc)
	fmt.Println(abc)

	// 222222
	var int3 int

	fmt.Print("$$ :")
	fmt.Scanln(&int3)

	if int3 <= 100 {
		fmt.Println("OK")
	} else {
		fmt.Println("Too much")
	}

	// 3333333
	var x int
	for x=0; x<3; x++ {
		if x ==1 {continue}
		fmt.Println(x)
	}

	// 44444444
	add := func(a int, b int) int {
		return a + b
	}

	fmt.Println(add(1, 2))

	// 55555555
	x, y := test()
	fmt.Println(x, y)
}


