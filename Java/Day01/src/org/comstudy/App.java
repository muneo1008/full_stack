package org.comstudy;

import java.util.Scanner;

public class App {
    public static void main(String[] args) throws Exception {
        // 기본타입
        // ---논리형 boolean
        // ---실수형 float,double
        // ---정수형 byte,short,int,long
        // ---문자형 char
        // String은 문자열을 다루는 타입으로 기본형처럼 쓰이는 참조형(클래스)

        Scanner sc = new Scanner(System.in);
        System.out.print("이름: ");
        String name = sc.nextLine();



        System.out.println(name);
    }
}
