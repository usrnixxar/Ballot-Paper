// Candidate id joins ballot cards and result rows. Set imageUrl to a PNG/WEBP URL from your future backend storage; null displays the built-in SVG symbol.\n// Example: imageUrl:'https://YOUR-PROJECT.supabase.co/storage/v1/object/public/candidate-symbols/star.png'
export const election = { title: 'Online Election', subtitle: 'Your Vote  •  Your Voice  •  A Stronger Tomorrow' };
export const initialCandidates = [
  {id:1,name:'Candidate 1',symbol:'star',color:'#e9a400',votes:0,imageUrl:null},
  {id:2,name:'Candidate 2',symbol:'book',color:'#ef3545',votes:0,imageUrl:null},
  {id:3,name:'Candidate 3',symbol:'tree',color:'#12af65',votes:0,imageUrl:null},
  {id:4,name:'Candidate 4',symbol:'lamp',color:'#6f4bf4',votes:0,imageUrl:null},
  {id:5,name:'Candidate 5',symbol:'wheel',color:'#1479e9',votes:0,imageUrl:null}
];
