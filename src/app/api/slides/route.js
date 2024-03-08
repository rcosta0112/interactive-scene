// import fs from 'fs'
// import path from 'path'

export async function GET(request) {

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

    const slides = [
      { fileName: "Slide1.JPG" },
      { fileName: "Slide2.JPG" },
      { fileName: "Slide3.JPG" },
    ];

  return new Response(JSON.stringify(slides));

}


// const dirRelativeToPublicFolder = 'img'

// const dir = path.resolve('./public', dirRelativeToPublicFolder);

// const filenames = fs.readdirSync(dir);

// const images = filenames.map(name => path.join('/', dirRelativeToPublicFolder, name))

// res.statusCode = 200
// res.json(images);