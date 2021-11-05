import java.util.Scanner;
public class Main
{
	public static void main(String[] args) {
		System.out.println(">>> Omar Almashhadani <<<");
		
		validateRecipe();
		 
	} // String[] args END
	
	static void validateRecipe(){
	    
	    
	    String[] fridge = {"tomato", "banana", "apple" , "onion" , "cucumber"};
	    String[] ingredients = {"tomato","onion" , "lettuce"};
	    int commonCounter=0;
	     for (int i = 0; i < fridge.length; i++)
        {
            for (int j = 0; j < ingredients.length; j++)
            {
                if(fridge[i] == (ingredients[j]))
                {
                 commonCounter++;
                 }
            }
        }
        if(commonCounter==ingredients.length){
            
            System.out.println(">>>>> True <<<<<");
        }else{
            System.out.println(">>>>> false <<<<<");
        }
    } //function end
} // Class End