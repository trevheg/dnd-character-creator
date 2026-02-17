

export function returnName() {
    const vowels = ["a", "e", "i", "o", "u"];
    const consonants = ["b", "ch", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "y", "z", "sh", "th"]
    const nameArray = [];
    const length = Math.floor(Math.random() * 2) + 2;


    nameArray.push(consonants[Math.floor(Math.random() * consonants.length)]);

    for (let i = 0; i < length; i++) {
        
        nameArray.push(vowels[Math.floor(Math.random() * vowels.length)])
        nameArray.push(consonants[Math.floor(Math.random() * consonants.length)]);
    }
    
    const name = nameArray.join("");
    
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

    return nameCapitalized;
}
