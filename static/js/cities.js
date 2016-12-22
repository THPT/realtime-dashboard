var cities = [
  {
    name       : 'Ha Noi',
    longitude  : 105.853886,
    latitude   : 21.0282739,
  },
  {
    name       : 'Hai Phong',
    longitude  : 106.683842,
    latitude   : 20.8647119,
  },
  {
    name       : 'Da Nang',
    longitude  : 108.224465,
    latitude   : 16.0756686,
  },
  {
    name       : 'Ho Chi Minh',
    longitude  : 106.700987,
    latitude   : 10.7765194,
  },
  {
    name       : 'Can Tho',
    longitude  : 105.788036,
    latitude   : 10.0361904,
  },
  {
    name       : 'An Giang',
    longitude  : 105.434568,
    latitude   : 10.3898824,
  },
  {
    name       : 'Ba Ria Vung Tau',
    longitude  : 107.07267,
    latitude   : 10.3496754,
  },
  {
    name       : 'Bac Giang',
    longitude  : 106.200285,
    latitude   : 21.275831,
  },
  {
    name       : 'Bac Can',
    longitude  : 105.828165,
    latitude   : 22.145032,
  },
  {
    name       : 'Bac Lieu',
    longitude  : 105.725128,
    latitude   : 9.29024341,
  },
  {
    name       : 'Bac Ninh',
    longitude  : 106.07592,
    latitude   : 21.1855819,
  },
  {
    name       : 'Ben Tre',
    longitude  : 106.373899,
    latitude   : 10.2360434,
  },
  {
    name       : 'Binh Dinh',
    longitude  : 109.228381,
    latitude   : 13.7690305,
  },
  {
    name       : 'Binh Duong',
    longitude  : 106.650501,
    latitude   : 10.9816684,
  },
  {
    name       : 'Binh Phuoc',
    longitude  : 106.900785,
    latitude   : 11.5396864,
  },
  {
    name       : 'Binh Thuan',
    longitude  : 108.100049,
    latitude   : 10.9237964,
  },
  {
    name       : 'Ca Mau',
    longitude  : 105.151069,
    latitude   : 9.1772094,
  },
  {
    name       : 'Cao Bang',
    longitude  : 106.257845,
    latitude   : 22.668634,
  },
  {
    name       : 'Dac Lac',
    longitude  : 108.04313,
    latitude   : 12.6743795,
  },
  {
    name       : 'Đắk Nông',
    longitude  : 107.685046,
    latitude   : 12.0034275,
  },
  {
    name       : 'Dien Bien',
    longitude  : 103.016355,
    latitude   : 21.386117,
  },
  {
    name       : 'Dong Nai',
    longitude  : 106.816537,
    latitude   : 10.9452734,
  },
  {
    name       : 'Dong Thap',
    longitude  : 105.631685,
    latitude   : 10.4592074,
  },
  {
    name       : 'Gia Lai',
    longitude  : 108.001424,
    latitude   : 13.9808145,
  },
  {
    name       : 'Ha Giang',
    longitude  : 104.980896,
    latitude   : 22.8282081,
  },
  {
    name       : 'Ha Nam',
    longitude  : 105.912372,
    latitude   : 20.5461559,
  },
  {
    name       : 'Ha Tinh',
    longitude  : 105.904641,
    latitude   : 18.3415468,
  },
  {
    name       : 'Hai Duong',
    longitude  : 106.33309,
    latitude   : 20.9401009,
  },
  {
    name       : 'Hau Giang',
    longitude  : 105.467978,
    latitude   : 9.78407042,
  },
  {
    name       : 'Hoa Binh',
    longitude  : 105.335322,
    latitude   : 20.8115669,
  },
  {
    name       : 'Hung Yen',
    longitude  : 106.057428,
    latitude   : 20.6546279,
  },
  {
    name       : 'Khanh Hoa',
    longitude  : 109.192682,
    latitude   : 12.2437125,
  },
  {
    name       : 'Kien Giang',
    longitude  : 105.082311,
    latitude   : 10.0093214,
  },
  {
    name       : 'Kom Tum',
    longitude  : 108.003489,
    latitude   : 14.3461916,
  },
  {
    name       : 'Lai Châu',
    longitude  : 103.44533,
    latitude   : 22.399207,
  },
  {
    name       : 'Lam Dong',
    longitude  : 108.443642,
    latitude   : 11.9364585,
  },
  {
    name       : 'Lang Son',
    longitude  : 106.753309,
    latitude   : 21.846392,
  },
  {
    name       : 'Lao Cai',
    longitude  : 103.973463,
    latitude   : 22.476104,
  },
  {
    name       : 'Long An',
    longitude  : 106.413011,
    latitude   : 10.5366014,
  },
  {
    name       : 'Nam Dinh',
    longitude  : 106.177694,
    latitude   : 20.4349609,
  },
  {
    name       : 'Nghe An',
    longitude  : 105.69316,
    latitude   : 18.6733908,
  },
  {
    name       : 'Ninh Binh',
    longitude  : 105.97595,
    latitude   : 20.2579789,
  },
  {
    name       : 'Ninh Thuan',
    longitude  : 108.990826,
    latitude   : 11.5656264,
  },
  {
    name       : 'Phu Tho',
    longitude  : 105.400748,
    latitude   : 21.322495,
  },
  {
    name       : 'Phu Yen',
    longitude  : 109.322169,
    latitude   : 13.0955445,
  },
  {
    name       : 'Quang Binh',
    longitude  : 106.623176,
    latitude   : 17.4668277,
  },
  {
    name       : 'Quang Nam',
    longitude  : 108.470991,
    latitude   : 15.5728316,
  },
  {
    name       : 'Quang Ngai',
    longitude  : 108.797156,
    latitude   : 15.1178446,
  },
  {
    name       : 'Quang Ninh',
    longitude  : 107.123658,
    latitude   : 20.9416489,
  },
  {
    name       : 'Quang Tri',
    longitude  : 107.099581,
    latitude   : 16.8176057,
  },
  {
    name       : 'Soc Trang',
    longitude  : 105.970841,
    latitude   : 9.59995442,
  },
  {
    name       : 'Son La',
    longitude  : 103.90289,
    latitude   : 21.33162,
  },
  {
    name       : 'Tay Ninh',
    longitude  : 106.09426,
    latitude   : 11.3145644,
  },
  {
    name       : 'Thai Binh',
    longitude  : 106.347061,
    latitude   : 20.4539449,
  },
  {
    name       : 'Thai Nguyen',
    longitude  : 105.844519,
    latitude   : 21.593689,
  },
  {
    name       : 'Thanh Hoa',
    longitude  : 105.775927,
    latitude   : 19.8075949,
  },
  {
    name       : 'Hue',
    longitude  : 107.58481,
    latitude   : 16.4621577,
  },
  {
    name       : 'Tien Giang',
    longitude  : 106.363224,
    latitude   : 10.3528914,
  },
  {
    name       : 'Tra Vinh',
    longitude  : 106.341127,
    latitude   : 9.93626843,
  },
  {
    name       : 'Tuyen Quang',
    longitude  : 105.217233,
    latitude   : 21.821563,
  },
  {
    name       : 'Vinh Long',
    longitude  : 105.972312,
    latitude   : 10.2542454,
  },
  {
    name       : 'Vinh Phúc',
    longitude  : 105.607572,
    latitude   : 21.309961,
  },
  {
    name       : 'Yen Bai',
    longitude  : 104.913649,
    latitude   : 21.725782,
  }
]
