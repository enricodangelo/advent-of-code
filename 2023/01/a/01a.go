package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"unicode"
)

const input = "input.01.a"

func solution() int {
	file, err := os.Open(input)
	if err != nil {
			log.Fatal(err)
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)

	var sum int

	for scanner.Scan() {
			line := scanner.Text()
			var first, last string
			firstAssigned := false
			for _, char := range line {
				if unicode.IsDigit(char) {
					if !firstAssigned {
						first = string(char)
						firstAssigned = true
					}
					last = string(char)
				}
			}
			calibration, err := strconv.Atoi(fmt.Sprintf("%v%v", first, last))
			if err != nil {
				log.Fatal(err)
			}
			sum += calibration
	}

	return sum
}
func main() {
	fmt.Println(solution())
}