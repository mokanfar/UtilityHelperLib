import { promises as fs } from "fs";
import { default as fs_extra} from "fs-extra";
import csv from "csvtojson";
import * as Json2csvParser from "json2csv";
// import * as path from "path";

export const _STATIC_DIR_ = '';

async function __(directory) {
	try {
		const dir = directory.split("\\").join("/");
		process.chdir(dir);
	  	const dirents = await fs.readdir(dir, { withFileTypes: true });  
	  	let _OBJ = {}
	  	_OBJ.files = dirents
	  		.filter((dirent) => dirent.isFile())
	   		.map((dirent) => dirent.name);
	    return [..._OBJ.files];
	} catch(err) {
		console.log(err)
	}
}

export async function ls(dir = ".") {
	return (await __(dir))
} 

export async function getAllFilesIn(dir) {
	return (await __(dir))
} 

export async function getFilesAsArrayIn(dir) {
	return (await __(dir))
} 

export async function ArrayOfFilesIn(dir) {
	return (await __(dir))
}

export async function getFilesIn(dir) {
	return (await __(dir))
}  


export async function listFiles(dir) {
	return (await __(dir))
} 

export async function getFiles(dir) {
	return (await __(dir))
}  


export async function deleteAllFilesIn(dir) {
	try {
		let files = await __(dir);
		let directory = dir.split("\\").join("/");
		process.chdir(directory);
		 for (const file of files) {
		    fs.unlink(file, err => {
		      if (err) throw err;
		    });
		}

	} catch(e) {
		console.log(e)
	}
}

export async function rm(file, dir) {
	try {
		if(dir) {
		let directory = dir.split("\\").join("/");
		process.chdir(directory);
		}
		fs.unlink(file);
	} catch(e) {
		console.log(e)
	}
}





export async function cd(dir) {
	let directory = dir.split("\\").join("/");
	return (await process.chdir(directory));
}






async function __cp(file,dir=_STATIC_DIR_) {
	try{
	if(!dir) {
		 throw new Error('directory must be specified for "cp" command,or specify const _STATIC_DIR_')
	} 
	let directory = dir.split("\\").join("/");
	await fs.copyFile(file, directory + "/" + file);
	
	} catch(e) {
		console.log(e)
	}
}
 

export async function copyfileTo(src,dir) {
	return (await __cp(src,dir))
} 

export async function cp_r(src,dir) {
	return (await __cp(src,dir))
} 

export async function copy(src,dir) {
	return (await __cp(src,dir))
} 




async function __cpr(src,dst) {
	try {
	let source = src.split("\\").join("/");
	let dest = dst.split("\\").join("/");
    await fs_extra.ensureDir(dest);
	await fs_extra.copy(source, dest)
	}catch(e){
		console.log(e)
	}
}

export async function copyAll(src,dst) {
	return (await __cpr(src,dst))
} 


 



export async function rename(file,newFilename) {
	try {
		await fs.rename(file, newFilename);
	}
	catch(e) {
		console.log(e)
	}

}


async function move(src, dest) {
  try {
    await fs_extra.move(src, dest)
  } catch (err) {
    console.error(err)
  }
}



async function __csv(file) {
  try {
    return(await csv().fromFile(file));

	}catch(e){console.log(e)}
}


export async function readFromCSV(file) {
	return (await __csv(file))
} 

export async function getDataJSON(file) {
	return (await __csv(file))
} 
export async function getJSONfromCSV(file) {
	return (await __csv(file))
} 
export async function getJSONfrom(file) {
	return (await __csv(file))
} 
export async function JSONobjCSV(file) {
	return (await __csv(file))
} 
export async function getJSON(file) {
	return (await __csv(file))
} 



async function __saveCSV(data,outputFile) {
	const json2csvParser = new Json2csvParser.default.Parser({ header: true });
	const _JSON_DATA_ = json2csvParser.parse(data);
	return (await fs.writeFile(outputFile, _JSON_DATA_).then(_=>process.exit()));
}


export async function saveAsCSV(data,outputFile) {
	return (await __saveCSV(data,outputFile))
} 


export async function saveCSV(data,outputFile) {
	return (await __saveCSV(data,outputFile))
} 

export async function JSONtoCSV(data,outputFile) {
	return (await __saveCSV(data,outputFile))
} 

export async function saveJSONtoCSV(data,outputFile) {
	return (await __saveCSV(data,outputFile))
} 

export async function CSVsave(data,outputFile) {
	return (await __saveCSV(data,outputFile))
} 


export async function writeToCSV(data,outputFile) {
	return (await __saveCSV(data,outputFile))
} 

//usage:
//getFiles(String.raw`C:\z\dirhelper\testdir\test`).then(_=>console.log(_));

//deleteAllFilesIn(String.raw`C:\z\dirhelper\testdir\test\a`).then(_=>console.log('done'));

//cd then remove a file
//cd(String.raw`C:\z\dirhelper\testdir\test\a`).then(_=>rm(_filename_))

//cd in dir 
//cd(String.raw`C:\z\dirhelper\testdir\test\a`).then(_=>console.log(_))

//cd then ls
//cd(String.raw`C:\z\dirhelper\testdir\test\a`).then(_=>ls()).then(_=>console.log(_))

//cd and copy into a dir
//cd(String.raw`C:\z\dirhelper\testdir\test\a`).then(_=>cp('2020-05-06_1642.jpg',String.raw`C:\z\dirhelper\testdir\test\b`))

//copy recursively 1 folder to another destination (src,dest)
//cp_r(String.raw`C:\z\dirhelper\testdir\test\a`,String.raw`C:\z\dirhelper\testdir\test\d`).then(_=>console.log('done'))

//cd into dir and rename a file
//cd(String.raw`C:\z\dirhelper\testdir\test\a`).then(_=>rename('lol.jpg','kek.jpg')).then(_=>console.log('done'))

//move 1 file to another folder and rename it as:
// cd(String.raw`C:\z\dirhelper\testdir\test\b`)
// 	.then(_=>move('lolz.jpg',String.raw`C:\z\dirhelper\testdir\test\z\shmekz.jpg`))
// 	.then(_=>console.log('done'))

//move 1 folder to another
//move(String.raw`C:\z\dirhelper\testdir\test\a`,String.raw`C:\z\dirhelper\testdir\test\z`)
//	.then(_=>console.log('done'))

//cd in dir read csv parse json and extract info.
// cd(String.raw`C:\z\dirhelper\testdir\test\b`)
// .then(_=>readFromCSV('jenny0512.csv'))
// .then(data => {
// 	for(let item of data) {
// 		console.log(item.sku)
// 	}
// }).catch(e=>console.log(e))

//cd in dir read csv parse json and extract info into a separate csv file.
// cd(String.raw`C:\z\dirhelper\testdir\test\b`)
// .then(_=>readFromCSV('jenny0512.csv'))
// .then(data => {
// 	let a = [];
// 	for(let item of data) {
// 		a.push({'sku':item.sku,'name':item.name});
// 	}
// 	saveasCSV(a,'asdf.csv').then(console.log('done'));
// }).catch(e=>console.log(e))