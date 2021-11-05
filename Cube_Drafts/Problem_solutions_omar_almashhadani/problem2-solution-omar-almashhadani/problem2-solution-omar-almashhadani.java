import java.util.Scanner;
public class Main
{
	public static void main(String[] args) {
		System.out.println(">>> Omar Almashhadani <<<");
		
		validateRecipe();
		 
	} // String[] args END
	
	static void validateRecipe(){
	    
	    
	    String[] fridge = {"tomato","onion" , "olives"};
	    String[] fridge_Quantity = {"2","3" , "1"};
	    
	    String[] ingredients = {"tomato","onion"};
	    String[] ingredients_Quantity = {"2","3"};
	    
	    int commonCounter1=0;
	    int score = 0;

	     for (int i = 0; i < fridge.length; i++)
        {
            for (int j = 0; j < ingredients.length; j++)
            {
                if(fridge[i] == (ingredients[j]))
                {
                 score++;
                 }
            }
        }
        
         for (int i = 0; i < fridge_Quantity.length; i++)
        {
            for (int j = 0; j < ingredients_Quantity.length; j++)
            {
                if(fridge_Quantity[i].equals(ingredients_Quantity[j]))
                {
                 score++;
                 }
            }
        }
        if(score==4){
            
            System.out.println(">>>>> True <<<<<");
        }else{
            System.out.println(">>>>> false <<<<<");
        }
    } //function end
} // Class End