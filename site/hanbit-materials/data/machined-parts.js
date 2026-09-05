window.CORECHEM_MACHINED_PARTS = {
  status: 'partner-review',
  categories: [
    {id:'sealing', code:'MP-01', icon:'SEAL', copy:{ko:{title:'씰링 부품',text:'가스켓, O-Ring, Piston Ring, 패킹처럼 유체와 가스를 차단하는 부품을 검토합니다.'},en:{title:'Sealing components',text:'Review gaskets, O-rings, piston rings, and packings for fluid and gas sealing.'},ja:{title:'シール部品',text:'ガスケット、Oリング、ピストンリング、パッキンなど流体・ガスを封止する部品を検討します。'}}},
    {id:'bellows', code:'MP-02', icon:'FLOW', copy:{ko:{title:'벨로우즈·유체 부품',text:'밸브·계측기기용 벨로우즈와 유체 제어 주변 부품을 요구조건부터 확인합니다.'},en:{title:'Bellows · fluid parts',text:'Start with requirements for bellows and fluid-control components around valves and instruments.'},ja:{title:'ベローズ・流体部品',text:'バルブ・計測機器用ベローズなど、流体制御部品を要件から確認します。'}}},
    {id:'support', code:'MP-03', icon:'MOTION', copy:{ko:{title:'베어링·슬라이딩 부품',text:'마찰·하중·운전 환경을 확인해 베어링과 슬라이딩 패드 적용을 검토합니다.'},en:{title:'Bearings · sliding parts',text:'Review bearings and sliding pads after confirming friction, load, and operating conditions.'},ja:{title:'ベアリング・摺動部品',text:'摩擦、荷重、使用環境を確認し、ベアリングや摺動パッドを検討します。'}}},
    {id:'drawing', code:'MP-04', icon:'DRAWING', copy:{ko:{title:'도면 기반 부품',text:'도면·치수표를 바탕으로 파트너 공급 가능성과 필요한 소재를 함께 확인합니다.'},en:{title:'Drawing-based parts',text:'Share a drawing or dimension sheet so partner supply feasibility and material can be reviewed.'},ja:{title:'図面ベースの部品',text:'図面・寸法表をもとに、パートナー供給の可否と素材を一緒に確認します。'}}}
  ]
};
window.CORECHEM_MACHINED_PARTS.categories.forEach(item=>{item.status=item.id==='drawing'?'partner-review':'reference';});
