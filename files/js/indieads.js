








function spawnAds()
{
    var adContainers = document.body.getElementsByClassName("indieads");

    for (let i = 0; i < adContainers.length; i++) {
        
        var linkElement = document.createElement("a");
        linkElement.target = "_blank";
        linkElement.className = "indiead-link"
        linkElement.id = `indieads-link-${i}`;
        
        var imgElement = document.createElement("img");
        imgElement.className = "indiead-img"
        imgElement.id = `indieads-img-${i}`;
        
        linkElement.append(imgElement);
        adContainers[i].append(linkElement);
        
        
        fetchIndieAd(linkElement.id, imgElement.id)
    }
}

async function fetchIndieAd(link_elementID, img_elementID) {
    

    // fetch the json game info file
    fetch(`https://indieads.github.io/foldernames.json`)
        .then((response) => { return response.json(); })
        .then((response) =>  {
            
            let foldernames = response["foldernames"];

            let foldername = foldernames[Math.floor(Math.random() * foldernames.length)];

            document.getElementById(img_elementID).src = `https://indieads.github.io/ads/${foldername}/${600}x${900}.png`;
            
            fetch(`https://indieads.github.io/ads/${foldername}/href`)
            .then((response) => {
                if (!response.ok)
                {
                    return "";
                }
                return response.text(); 
            })
            .then((response) => {
                document.getElementById(link_elementID).href = `${response}`
            })

        });

}

spawnAds();