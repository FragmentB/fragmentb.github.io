export class tools{
    
    randomInt(max: number,min: number){
        if(min)
        {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        else
        {
            return Math.floor(Math.random() * max);
        }
    }
}