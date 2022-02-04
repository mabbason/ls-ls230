"use strict";
document.addEventListener('DOMContentLoaded', () => {
  let classifFilter = {
    'Classifications': ['Animals', 'Bear', 'Turtle',
                        'Whale', 'Salmon', 'Ostrich'],
    'Vertebrate': ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded': ['Salmon', 'Turtle'],
    'Mammal': ['Bear', 'Whale'],
    'Bird': ['Ostrich'],
   }
   
   let animalsFilter = {
     'Animals': ['Classifications', 'Vertebrate', 'Warm-blooded',
                 'Cold-blooded', 'Mammal', 'Bird'],
     'Bear': ['Vertebrate', 'Warm-blooded', 'Mammal'],
     'Turtle': ['Vertebrate', 'Cold-blooded'],
     'Whale': ['Vertebrate', 'Warm-blooded', 'Mammal'],
     'Salmon': ['Vertebrate', 'Cold-blooded'],
     'Ostrich': ['Vertebrate', 'Warm-blooded', 'Bird'],
   }
})
