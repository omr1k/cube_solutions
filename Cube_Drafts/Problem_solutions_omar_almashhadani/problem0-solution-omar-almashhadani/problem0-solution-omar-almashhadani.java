import java.util.Scanner;
public class Main
{
	public static void main(String[] args) {
		System.out.println(">>>Omar Almashhadani<<<");
		 whereIsMyFood();
	} // String[] args END
	static void whereIsMyFood(){
	    String item;
	    String[] fridge = {"apple", "banana", "water" , "milk" , "orange","cheese"};
	    Scanner sc1 = new Scanner(System.in);
		System.out.print("Enter item you are looking for --->>>> ");
		item = sc1.nextLine();
		int fridgelength = fridge.length;
         int trueflag = 0;
         for (int i=0;i<fridgelength;i++){
             String x=fridge[i];
             int index = -1;
             if(x.equalsIgnoreCase(item)){
                 trueflag=1;
                 index = i;
                 System.out.print("The index of the (item) is --->> "+index);
                 break;
             }
         } // for loop end
         if (trueflag != 1){
             System.out.print(">>>>> -1 <<<<<");
         }
    } //function end
} // Class End