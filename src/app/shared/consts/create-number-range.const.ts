import {range} from 'src/app/shared/models/range.model';

export const createNumberRange = (number: number): range[] => {
  const ranges: range[] = [
    {
      label: "0-5000",
      min: 0,
      max: 5000,
      isCorrect: false
    },
    {
      label: "5000-10000",
      min: 5000,
      max: 10000,
      isCorrect: false
    },
    {
      label: "10000-15000",
      min: 10000,
      max: 15000,
      isCorrect: false
    },
    {
      label: "15000-20000",
      min: 15000,
      max: 20000,
      isCorrect: false
    },
    {
      label: "20000-25000",
      min: 20000,
      max: 25000,
      isCorrect: false
    },
    {
      label: "25000-30000",
      min: 25000,
      max: 30000,
      isCorrect: false
    },
    {
      label: "30000-35000",
      min: 30000,
      max: 35000,
      isCorrect: false
    },
    {
      label: "35000-40000",
      min: 35000,
      max: 40000,
      isCorrect: false
    },
    {
      label: "40000-45000",
      min: 40000,
      max: 45000,
      isCorrect: false
    },
    {
      label: "45000-50000",
      min: 45000,
      max: 50000,
      isCorrect: false
    },
    {
      label: "50000-55000",
      min: 50000,
      max: 55000,
      isCorrect: false
    },
    {
      label: "55000-60000",
      min: 55000,
      max: 60000,
      isCorrect: false
    },
    {
      label: "60000-65000",
      min: 60000,
      max: 65000,
      isCorrect: false
    },
    {
      label: "65000-70000",
      min: 65000,
      max: 70000,
      isCorrect: false
    },
    {
      label: "70000-75000",
      min: 70000,
      max: 75000,
      isCorrect: false
    },
    {
      label: "75000-80000",
      min: 75000,
      max: 80000,
      isCorrect: false
    },
    {
      label: "80000-85000",
      min: 80000,
      max: 85000,
      isCorrect: false
    },
    {
      label: "85000-90000",
      min: 85000,
      max: 90000,
      isCorrect: false
    },
    {
      label: "90000-95000",
      min: 90000,
      max: 95000,
      isCorrect: false
    },
    {
      label: "95000-100000",
      min: 95000,
      max: 100000,
      isCorrect: false
    },
    {
      label: "100000-105000",
      min: 100000,
      max: 105000,
      isCorrect: false
    },
    {
      label: "105000-110000",
      min: 105000,
      max: 110000,
      isCorrect: false
    },
    {
      label: "110000-115000",
      min: 110000,
      max: 115000,
      isCorrect: false
    },
    {
      label: "115000-120000",
      min: 115000,
      max: 120000,
      isCorrect: false
    },
    {
      label: "120000-125000",
      min: 120000,
      max: 125000,
      isCorrect: false
    },
    {
      label: "125000-130000",
      min: 125000,
      max: 130000,
      isCorrect: false
    },
    {
      label: "130000-135000",
      min: 130000,
      max: 135000,
      isCorrect: false
    },
    {
      label: "135000-140000",
      min: 135000,
      max: 140000,
      isCorrect: false
    },
    {
      label: "140000-145000",
      min: 140000,
      max: 145000,
      isCorrect: false
    },
    {
      label: "145000-150000",
      min: 145000,
      max: 150000,
      isCorrect: false
    },
    {
      label: "150000-155000",
      min: 150000,
      max: 155000,
      isCorrect: false
    },
    {
      label: "155000-160000",
      min: 155000,
      max: 160000,
      isCorrect: false
    },
    {
      label: "160000-165000",
      min: 160000,
      max: 165000,
      isCorrect: false
    },
    {
      label: "165000-170000",
      min: 165000,
      max: 170000,
      isCorrect: false
    },
    {
      label: "170000-175000",
      min: 170000,
      max: 175000,
      isCorrect: false
    },
    {
      label: "175000-180000",
      min: 175000,
      max: 180000,
      isCorrect: false
    },
    {
      label: "180000-185000",
      min: 180000,
      max: 185000,
      isCorrect: false
    },
    {
      label: "185000-190000",
      min: 185000,
      max: 190000,
      isCorrect: false
    },
    {
      label: "190000-195000",
      min: 190000,
      max: 195000,
      isCorrect: false
    },
    {
      label: "195000-200000",
      min: 195000,
      max: 200000,
      isCorrect: false
    },
    {
      label: "200000-205000",
      min: 200000,
      max: 205000,
      isCorrect: false
    },
    {
      label: "205000-210000",
      min: 205000,
      max: 210000,
      isCorrect: false
    },
    {
      label: "210000-215000",
      min: 210000,
      max: 215000,
      isCorrect: false
    },
    {
      label: "215000-220000",
      min: 215000,
      max: 220000,
      isCorrect: false
    },
    {
      label: "220000-225000",
      min: 220000,
      max: 225000,
      isCorrect: false
    },
    {
      label: "225000-230000",
      min: 225000,
      max: 230000,
      isCorrect: false
    },
    {
      label: "230000-235000",
      min: 230000,
      max: 235000,
      isCorrect: false
    },
    {
      label: "235000-240000",
      min: 235000,
      max: 240000,
      isCorrect: false
    },
    {
      label: "240000-245000",
      min: 240000,
      max: 245000,
      isCorrect: false
    },
    {
      label: "245000-250000",
      min: 245000,
      max: 250000,
      isCorrect: false
    },
    {
      label: "250000-255000",
      min: 250000,
      max: 255000,
      isCorrect: false
    },
    {
      label: "255000-260000",
      min: 255000,
      max: 260000,
      isCorrect: false
    },
    {
      label: "260000-265000",
      min: 260000,
      max: 265000,
      isCorrect: false
    },
    {
      label: "265000-270000",
      min: 265000,
      max: 270000,
      isCorrect: false
    },
    {
      label: "270000-275000",
      min: 270000,
      max: 275000,
      isCorrect: false
    },
    {
      label: "275000-280000",
      min: 275000,
      max: 280000,
      isCorrect: false
    },
    {
      label: "280000-285000",
      min: 280000,
      max: 285000,
      isCorrect: false
    },
    {
      label: "285000-290000",
      min: 285000,
      max: 290000,
      isCorrect: false
    },
    {
      label: "290000-295000",
      min: 290000,
      max: 295000,
      isCorrect: false
    },
    {
      label: "295000-300000",
      min: 295000,
      max: 300000,
      isCorrect: false
    },
    {
      label: "300000-305000",
      min: 300000,
      max: 305000,
      isCorrect: false
    },
    {
      label: "305000-310000",
      min: 305000,
      max: 310000,
      isCorrect: false
    },
    {
      label: "310000-315000",
      min: 310000,
      max: 315000,
      isCorrect: false
    },
    {
      label: "315000-320000",
      min: 315000,
      max: 320000,
      isCorrect: false
    },
    {
      label: "320000-325000",
      min: 320000,
      max: 325000,
      isCorrect: false
    },
    {
      label: "325000-330000",
      min: 325000,
      max: 330000,
      isCorrect: false
    },
    {
      label: "330000-335000",
      min: 330000,
      max: 335000,
      isCorrect: false
    },
    {
      label: "335000-340000",
      min: 335000,
      max: 340000,
      isCorrect: false
    },
    {
      label: "340000-345000",
      min: 340000,
      max: 345000,
      isCorrect: false
    },
    {
      label: "345000-350000",
      min: 345000,
      max: 350000,
      isCorrect: false
    },
    {
      label: "350000-355000",
      min: 350000,
      max: 355000,
      isCorrect: false
    },
    {
      label: "355000-360000",
      min: 355000,
      max: 360000,
      isCorrect: false
    },
    {
      label: "360000-365000",
      min: 360000,
      max: 365000,
      isCorrect: false
    },
    {
      label: "365000-370000",
      min: 365000,
      max: 370000,
      isCorrect: false
    },
    {
      label: "370000-375000",
      min: 370000,
      max: 375000,
      isCorrect: false
    },
    {
      label: "375000-380000",
      min: 375000,
      max: 380000,
      isCorrect: false
    },
    {
      label: "380000-385000",
      min: 380000,
      max: 385000,
      isCorrect: false
    },
    {
      label: "385000-390000",
      min: 385000,
      max: 390000,
      isCorrect: false
    },
    {
      label: "390000-395000",
      min: 390000,
      max: 395000,
      isCorrect: false
    },
    {
      label: "395000-400000",
      min: 395000,
      max: 400000,
      isCorrect: false
    },
    {
      label: "400000-405000",
      min: 400000,
      max: 405000,
      isCorrect: false
    },
    {
      label: "405000-410000",
      min: 405000,
      max: 410000,
      isCorrect: false
    },
    {
      label: "410000-415000",
      min: 410000,
      max: 415000,
      isCorrect: false
    },
    {
      label: "415000-420000",
      min: 415000,
      max: 420000,
      isCorrect: false
    },
    {
      label: "420000-425000",
      min: 420000,
      max: 425000,
      isCorrect: false
    },
    {
      label: "425000-430000",
      min: 425000,
      max: 430000,
      isCorrect: false
    },
    {
      label: "430000-435000",
      min: 430000,
      max: 435000,
      isCorrect: false
    },
    {
      label: "435000-440000",
      min: 435000,
      max: 440000,
      isCorrect: false
    },
    {
      label: "440000-445000",
      min: 440000,
      max: 445000,
      isCorrect: false
    },
    {
      label: "445000-450000",
      min: 445000,
      max: 450000,
      isCorrect: false
    },
    {
      label: "450000-455000",
      min: 450000,
      max: 455000,
      isCorrect: false
    },
    {
      label: "455000-460000",
      min: 455000,
      max: 460000,
      isCorrect: false
    },
    {
      label: "460000-465000",
      min: 460000,
      max: 465000,
      isCorrect: false
    },
    {
      label: "465000-470000",
      min: 465000,
      max: 470000,
      isCorrect: false
    },
    {
      label: "470000-475000",
      min: 470000,
      max: 475000,
      isCorrect: false
    },
    {
      label: "475000-480000",
      min: 475000,
      max: 480000,
      isCorrect: false
    },
    {
      label: "480000-485000",
      min: 480000,
      max: 485000,
      isCorrect: false
    },
    {
      label: "485000-490000",
      min: 485000,
      max: 490000,
      isCorrect: false
    },
    {
      label: "490000-495000",
      min: 490000,
      max: 495000,
      isCorrect: false
    },
    {
      label: "495000-500000",
      min: 495000,
      max: 500000,
      isCorrect: false
    },
    {
      label: "500000-505000",
      min: 500000,
      max: 505000,
      isCorrect: false
    },
    {
      label: "505000-510000",
      min: 505000,
      max: 510000,
      isCorrect: false
    },
    {
      label: "510000-515000",
      min: 510000,
      max: 515000,
      isCorrect: false
    },
    {
      label: "515000-520000",
      min: 515000,
      max: 520000,
      isCorrect: false
    },
    {
      label: "520000-525000",
      min: 520000,
      max: 525000,
      isCorrect: false
    },
    {
      label: "525000-530000",
      min: 525000,
      max: 530000,
      isCorrect: false
    },
    {
      label: "530000-535000",
      min: 530000,
      max: 535000,
      isCorrect: false
    },
    {
      label: "535000-540000",
      min: 535000,
      max: 540000,
      isCorrect: false
    },
    {
      label: "540000-545000",
      min: 540000,
      max: 545000,
      isCorrect: false
    },
    {
      label: "545000-550000",
      min: 545000,
      max: 550000,
      isCorrect: false
    },
    {
      label: "550000-555000",
      min: 550000,
      max: 555000,
      isCorrect: false
    },
    {
      label: "555000-560000",
      min: 555000,
      max: 560000,
      isCorrect: false
    },
    {
      label: "560000-565000",
      min: 560000,
      max: 565000,
      isCorrect: false
    },
    {
      label: "565000-570000",
      min: 565000,
      max: 570000,
      isCorrect: false
    },
    {
      label: "570000-575000",
      min: 570000,
      max: 575000,
      isCorrect: false
    },
    {
      label: "575000-580000",
      min: 575000,
      max: 580000,
      isCorrect: false
    },
    {
      label: "580000-585000",
      min: 580000,
      max: 585000,
      isCorrect: false
    },
    {
      label: "585000-590000",
      min: 585000,
      max: 590000,
      isCorrect: false
    },
    {
      label: "590000-595000",
      min: 590000,
      max: 595000,
      isCorrect: false
    },
    {
      label: "595000-600000",
      min: 595000,
      max: 600000,
      isCorrect: false
    },
    {
      label: "600000-605000",
      min: 600000,
      max: 605000,
      isCorrect: false
    },
    {
      label: "605000-610000",
      min: 605000,
      max: 610000,
      isCorrect: false
    },
    {
      label: "610000-615000",
      min: 610000,
      max: 615000,
      isCorrect: false
    },
    {
      label: "615000-620000",
      min: 615000,
      max: 620000,
      isCorrect: false
    },
    {
      label: "620000-625000",
      min: 620000,
      max: 625000,
      isCorrect: false
    },
    {
      label: "625000-630000",
      min: 625000,
      max: 630000,
      isCorrect: false
    },
    {
      label: "630000-635000",
      min: 630000,
      max: 635000,
      isCorrect: false
    },
    {
      label: "635000-640000",
      min: 635000,
      max: 640000,
      isCorrect: false
    },
    {
      label: "640000-645000",
      min: 640000,
      max: 645000,
      isCorrect: false
    },
    {
      label: "645000-650000",
      min: 645000,
      max: 650000,
      isCorrect: false
    },
    {
      label: "650000-655000",
      min: 650000,
      max: 655000,
      isCorrect: false
    },
    {
      label: "655000-660000",
      min: 655000,
      max: 660000,
      isCorrect: false
    },
    {
      label: "660000-665000",
      min: 660000,
      max: 665000,
      isCorrect: false
    },
    {
      label: "665000-670000",
      min: 665000,
      max: 670000,
      isCorrect: false
    },
    {
      label: "670000-675000",
      min: 670000,
      max: 675000,
      isCorrect: false
    },
    {
      label: "675000-680000",
      min: 675000,
      max: 680000,
      isCorrect: false
    },
    {
      label: "680000-685000",
      min: 680000,
      max: 685000,
      isCorrect: false
    },
    {
      label: "685000-690000",
      min: 685000,
      max: 690000,
      isCorrect: false
    },
    {
      label: "690000-695000",
      min: 690000,
      max: 695000,
      isCorrect: false
    },
    {
      label: "695000-700000",
      min: 695000,
      max: 700000,
      isCorrect: false
    },
    {
      label: "700000-705000",
      min: 700000,
      max: 705000,
      isCorrect: false
    },
    {
      label: "705000-710000",
      min: 705000,
      max: 710000,
      isCorrect: false
    },
    {
      label: "710000-715000",
      min: 710000,
      max: 715000,
      isCorrect: false
    },
    {
      label: "715000-720000",
      min: 715000,
      max: 720000,
      isCorrect: false
    },
    {
      label: "720000-725000",
      min: 720000,
      max: 725000,
      isCorrect: false
    },
    {
      label: "725000-730000",
      min: 725000,
      max: 730000,
      isCorrect: false
    },
    {
      label: "730000-735000",
      min: 730000,
      max: 735000,
      isCorrect: false
    },
    {
      label: "735000-740000",
      min: 735000,
      max: 740000,
      isCorrect: false
    },
    {
      label: "740000-745000",
      min: 740000,
      max: 745000,
      isCorrect: false
    },
    {
      label: "745000-750000",
      min: 745000,
      max: 750000,
      isCorrect: false
    },
    {
      label: "750000-755000",
      min: 750000,
      max: 755000,
      isCorrect: false
    },
    {
      label: "755000-760000",
      min: 755000,
      max: 760000,
      isCorrect: false
    },
    {
      label: "760000-765000",
      min: 760000,
      max: 765000,
      isCorrect: false
    },
    {
      label: "765000-770000",
      min: 765000,
      max: 770000,
      isCorrect: false
    },
    {
      label: "770000-775000",
      min: 770000,
      max: 775000,
      isCorrect: false
    },
    {
      label: "775000-780000",
      min: 775000,
      max: 780000,
      isCorrect: false
    },
    {
      label: "780000-785000",
      min: 780000,
      max: 785000,
      isCorrect: false
    },
    {
      label: "785000-790000",
      min: 785000,
      max: 790000,
      isCorrect: false
    },
    {
      label: "790000-795000",
      min: 790000,
      max: 795000,
      isCorrect: false
    },
    {
      label: "795000-800000",
      min: 795000,
      max: 800000,
      isCorrect: false
    },
    {
      label: "800000-805000",
      min: 800000,
      max: 805000,
      isCorrect: false
    },
    {
      label: "805000-810000",
      min: 805000,
      max: 810000,
      isCorrect: false
    },
    {
      label: "810000-815000",
      min: 810000,
      max: 815000,
      isCorrect: false
    },
    {
      label: "815000-820000",
      min: 815000,
      max: 820000,
      isCorrect: false
    },
    {
      label: "820000-825000",
      min: 820000,
      max: 825000,
      isCorrect: false
    },
    {
      label: "825000-830000",
      min: 825000,
      max: 830000,
      isCorrect: false
    },
    {
      label: "830000-835000",
      min: 830000,
      max: 835000,
      isCorrect: false
    },
    {
      label: "835000-840000",
      min: 835000,
      max: 840000,
      isCorrect: false
    },
    {
      label: "840000-845000",
      min: 840000,
      max: 845000,
      isCorrect: false
    },
    {
      label: "845000-850000",
      min: 845000,
      max: 850000,
      isCorrect: false
    },
    {
      label: "850000-855000",
      min: 850000,
      max: 855000,
      isCorrect: false
    },
    {
      label: "855000-860000",
      min: 855000,
      max: 860000,
      isCorrect: false
    },
    {
      label: "860000-865000",
      min: 860000,
      max: 865000,
      isCorrect: false
    },
    {
      label: "865000-870000",
      min: 865000,
      max: 870000,
      isCorrect: false
    },
    {
      label: "870000-875000",
      min: 870000,
      max: 875000,
      isCorrect: false
    },
    {
      label: "875000-880000",
      min: 875000,
      max: 880000,
      isCorrect: false
    },
    {
      label: "880000-885000",
      min: 880000,
      max: 885000,
      isCorrect: false
    },
    {
      label: "885000-890000",
      min: 885000,
      max: 890000,
      isCorrect: false
    },
    {
      label: "890000-895000",
      min: 890000,
      max: 895000,
      isCorrect: false
    },
    {
      label: "895000-900000",
      min: 895000,
      max: 900000,
      isCorrect: false
    },
    {
      label: "900000-905000",
      min: 900000,
      max: 905000,
      isCorrect: false
    },
    {
      label: "905000-910000",
      min: 905000,
      max: 910000,
      isCorrect: false
    },
    {
      label: "910000-915000",
      min: 910000,
      max: 915000,
      isCorrect: false
    },
    {
      label: "915000-920000",
      min: 915000,
      max: 920000,
      isCorrect: false
    },
    {
      label: "920000-925000",
      min: 920000,
      max: 925000,
      isCorrect: false
    },
    {
      label: "925000-930000",
      min: 925000,
      max: 930000,
      isCorrect: false
    },
    {
      label: "930000-935000",
      min: 930000,
      max: 935000,
      isCorrect: false
    },
    {
      label: "935000-940000",
      min: 935000,
      max: 940000,
      isCorrect: false
    },
    {
      label: "940000-945000",
      min: 940000,
      max: 945000,
      isCorrect: false
    },
    {
      label: "945000-950000",
      min: 945000,
      max: 950000,
      isCorrect: false
    },
    {
      label: "950000-955000",
      min: 950000,
      max: 955000,
      isCorrect: false
    },
    {
      label: "955000-960000",
      min: 955000,
      max: 960000,
      isCorrect: false
    },
    {
      label: "960000-965000",
      min: 960000,
      max: 965000,
      isCorrect: false
    },
    {
      label: "965000-970000",
      min: 965000,
      max: 970000,
      isCorrect: false
    },
    {
      label: "970000-975000",
      min: 970000,
      max: 975000,
      isCorrect: false
    },
    {
      label: "975000-980000",
      min: 975000,
      max: 980000,
      isCorrect: false
    },
    {
      label: "980000-985000",
      min: 980000,
      max: 985000,
      isCorrect: false
    },
    {
      label: "985000-990000",
      min: 985000,
      max: 990000,
      isCorrect: false
    },
    {
      label: "990000-995000",
      min: 990000,
      max: 995000,
      isCorrect: false
    },
    {
      label: "995000-1000000",
      min: 995000,
      max: 1000000,
      isCorrect: false
    }
  ];
  const ind: number = ranges.findIndex(range => number >= range.min && number <= range.max);
  const data: range[] = [];
  ranges[ind].isCorrect = true;

  if (ind - 1 >= 0) data.push(ranges[ind - 1]);
  if (ind - 2 >= 0) data.push(ranges[ind - 2]);
  if (ind - 3 >= 0) data.push(ranges[ind - 3]);
  if (ind + 1 < ranges.length) data.push(ranges[ind + 1]);
  if (ind + 2 < ranges.length) data.push(ranges[ind + 2]);
  if (ind + 3 < ranges.length) data.push(ranges[ind + 3]);

  const answers: range[] = getRandomSubarray(data);
  answers.push(ranges[ind]);
  shuffleArray(answers);
  answers.sort((a, b) => a.min - b.min);

  return answers;
}

const getRandomSubarray = (arr: range[]): range[] => {
  let shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, 3);
};

const shuffleArray = (array: range[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

