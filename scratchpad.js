
let flag = true;
bills.map(bill => {
    
    if(!o.haskey(bill)) {o.set(bill.toString(),1)}
    else {o[bill] = o[bill]+1};
    
    //10
    if(5 < bill && bill < 20 ) {

        if(o['5'] > 0) { 
    o['5'] = o['5']-1 ;
        }
        else {flag = false;}
    }
    //20
    else {
        if(bill !==5) { 
        if (o['10'] > 0 && o['5'] > 0) {
            console.log(o['5']);

            o['10'] = o['10']-1;
            o['5'] = o['5']-1;
        } else {
            if(o['5'] > 2) {

                o['5'] = o['5'] - 3;
            } else {
                flag = false;
            }
        }
    }
    }
})
