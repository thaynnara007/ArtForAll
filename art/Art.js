/**
Represents a Art
@constructor
@param {string} imgLink - The link of the imagem
@param {(string|string[]} tags - an array of names of tags
@param {int} id - The id of the art
*/
var Art = function(imgLink, tags, id){

	this.imgLink = imgLink;
	this.tags = tags;
	this.id = id;
}

art1 = new Art('https://cdn.shopify.com/s/files/1/0558/2081/products/ATCAWM_FC_1024x1024.jpg?v=1534804643',
		['adventure time', 'fanart', 'finn', 'jake'], 1);

art2 = new Art('https://cdn.vox-cdn.com/thumbor/q0ujcr0H33ybBRUUNNFL1QVBAKY=/0x0:1920x1080/1200x800/filters:focal(760x282:1066x588)/cdn.vox-cdn.com/uploads/chorus_image/image/61137005/adventure_time_stakes.0.jpg',
		['adventure time', 'marceline', 'bonnibel'], 2);

art3 = new Art('http://montink.camisadimona.com.br/image/cache/data/camisas/camiseta-midoriya-izuku---boku-no-hero-academia-5a5586485dc9b-estampa-307-680x969.png',
		['boku no hero academia', 'boku no hero', 'deku', 'midorya', 'one for all'], 3);

art4 = new Art('http://www.nerdtrip.com.br/wp-content/uploads/2017/09/Shingeki-no-Kyojin-segunda-temporada-2017-2.jpg',
		['shingeki no kyojin', 'attack on titan', 'erin', 'tita', 'wall'], 4);

this.arts = () => [art1, art2];
this.favorites = () => [art3, art4] ;
