window.CORECHEM_MACHINED_PARTS = {
  status: 'partner-review',
  categories: [
    {id:'sealing', code:'MP-01', icon:'SEAL', copy:{ko:{title:'씰링 부품',text:'가스켓, O-Ring, Piston Ring, 패킹처럼 유체와 가스를 차단하는 부품을 검토합니다.'},en:{title:'Sealing components',text:'Review gaskets, O-rings, piston rings, and packings for fluid and gas sealing.'},ja:{title:'シール部品',text:'ガスケット、Oリング、ピストンリング、パッキンなど流体・ガスを封止する部品を検討します。'}}},
    {id:'bellows', code:'MP-02', icon:'FLOW', copy:{ko:{title:'벨로우즈·유체 부품',text:'밸브·계측기기용 벨로우즈와 유체 제어 주변 부품을 요구조건부터 확인합니다.'},en:{title:'Bellows · fluid parts',text:'Start with requirements for bellows and fluid-control components around valves and instruments.'},ja:{title:'ベローズ・流体部品',text:'バルブ・計測機器用ベローズなど、流体制御部品を要件から確認します。'}}},
    {id:'support', code:'MP-03', icon:'MOTION', copy:{ko:{title:'베어링·슬라이딩 부품',text:'마찰·하중·운전 환경을 확인해 베어링과 슬라이딩 패드 적용을 검토합니다.'},en:{title:'Bearings · sliding parts',text:'Review bearings and sliding pads after confirming friction, load, and operating conditions.'},ja:{title:'ベアリング・摺動部品',text:'摩擦、荷重、使用環境を確認し、ベアリングや摺動パッドを検討します。'}}},
    {id:'drawing', code:'MP-04', icon:'DRAWING', copy:{ko:{title:'도면 기반 부품',text:'도면·치수표를 바탕으로 파트너 공급 가능성과 필요한 소재를 함께 확인합니다.'},en:{title:'Drawing-based parts',text:'Share a drawing or dimension sheet so partner supply feasibility and material can be reviewed.'},ja:{title:'図面ベースの部品',text:'図面・寸法表をもとに、パートナー供給の可否と素材を一緒に確認します。'}}}
  ],
  semiconductorFocus: [
    {code:'01',icon:'CLEANLINESS',copy:{ko:{title:'청정도 검토',text:'공정 오염과 파티클 민감도를 요구조건에 포함해 검토합니다.'},en:{title:'Cleanliness review',text:'Include process contamination and particle sensitivity in the requirement review.'},ja:{title:'清浄度の確認',text:'工程汚染とパーティクル感度を要件に含めて確認します。'}}},
    {code:'02',icon:'CHEMICALS',copy:{ko:{title:'약액·가스 호환성',text:'접촉 매체와 온도·압력 조건을 기준으로 소재 후보를 좁힙니다.'},en:{title:'Media compatibility',text:'Narrow material candidates by contacted media, temperature, and pressure.'},ja:{title:'媒体適合性',text:'接触媒体、温度、圧力条件を基準に素材候補を絞ります。'}}},
    {code:'03',icon:'GEOMETRY',copy:{ko:{title:'정밀 형상 검토',text:'씰, 벨로즈와 도면 기반 형상의 공급 가능성을 파트너와 확인합니다.'},en:{title:'Precision geometry',text:'Review supply feasibility for seals, bellows, and drawing-based geometries with partners.'},ja:{title:'精密形状',text:'シール、ベローズ、図面形状の供給可否をパートナーと確認します。'}}},
    {code:'04',icon:'TRACEABILITY',copy:{ko:{title:'자료·이력 확인',text:'제품별 자료와 검사·추적성 요구를 문의 단계에서 확인합니다.'},en:{title:'Evidence and traceability',text:'Confirm product documents and inspection or traceability needs at enquiry.'},ja:{title:'資料・トレーサビリティ',text:'製品資料と検査・追跡性の要件を問い合わせ時に確認します。'}}}
  ]
};
window.CORECHEM_MACHINED_PARTS.categories.forEach(item=>{item.status=item.id==='drawing'?'partner-review':'reference';});
