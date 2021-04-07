const defaultCode = {
    1 : "#include<stdio.h>\n\nint main(){\n//Write you Code here\nreturn 0 ;\n }", 
    2: "#include <iostream>\nusing namespace std ;\n int main(){\n//Write your code here\nreturn 0 ;\n}\n",
    4: "public class Main\n{\npublic static void main(String[] args) {\nSystem.out.println('Hello World');\n}\n}\n",
    10:"#write your Code here"
}
const langMap = { 
    1 :"C" , 
    2:"C++ 17", 
    4:"Java",
    10:"Python 3"
}
export default defaultCode ; 
export {defaultCode , langMap} ; 