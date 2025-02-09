import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; 

function App() {
  const [formData, setFormData] = useState({
    LotFrontage: 80,
    LotArea: 10000,
    OverallQual: 7,
    OverallCond: 5,
    YearBuilt: 1995,
    YearRemodAdd: 2015,
    MSZoning: 'RL',
    Street: 'Pave',
    LotShape: 'Reg',
    LandContour: 'Lvl',
    Utilities: 'AllPub',
    LotConfig: 'Inside',
    LandSlope: 'Gtl',
    Neighborhood: 'CollgCr',
    Condition1: 'Norm',
    Condition2: 'Norm',
    BldgType: '1Fam',
    HouseStyle: '2Story',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null); 
    setError(null); 
  
    // Veriyi istenilen formatta hazırlıyoruz
    const requestData = {
      LotFrontage: formData.LotFrontage,
      LotArea: formData.LotArea,
      OverallQual: formData.OverallQual,
      OverallCond: formData.OverallCond,
      YearBuilt: formData.YearBuilt,
      YearRemodAdd: formData.YearRemodAdd,
      MSZoning: formData.MSZoning,
      Street: formData.Street,
      LotShape: formData.LotShape,
      LandContour: formData.LandContour,
      Utilities: formData.Utilities,
      LotConfig: formData.LotConfig,
      LandSlope: formData.LandSlope, 
      Neighborhood: formData.Neighborhood, 
      Condition1: formData.Condition1, 
      Condition2: formData.Condition2, 
      BldgType: formData.BldgType, 
      HouseStyle: formData.HouseStyle, 
    };
  
    try {
        const response = await axios.post('http://127.0.0.1:5000/api/predict', requestData);
        if (response.data && response.data[0]) {
        const predictionValue = Math.floor(response.data[0]); // Tam sayıya yuvarlama
        setPrediction(predictionValue);
        } else {
        setError(response.data.error || 'Bir hata oluştu.');
        }

        
    } catch (err) {
      setError('Tahmin yapılırken bir hata oluştu.');
    }
  };
  

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Konut Fiyatı Tahmin Uygulaması</h1>
      <form onSubmit={handleSubmit}>
        <label>LotFrontage (m²):</label>
        <select
          name="LotFrontage"
          value={formData.LotFrontage}
          onChange={handleInputChange}
        >
          {[65, 80, 68, 60, 84, 85, 75, 51, 50, 70, 91, 72, 66, 101, 57, 44, 110, 98, 47, 108, 112, 74, 115, 61, 48, 33, 52, 100, 24, 89, 63, 76, 81, 95, 69, 21, 32, 78, 121, 122, 40, 105, 73, 77, 64, 94, 34, 90, 55, 88, 82, 71, 120, 107, 92, 134, 62, 86, 141, 97, 54, 41, 79, 174, 99, 67, 83, 43, 103, 93, 30, 129, 140, 35, 37, 118, 87, 116, 150, 111, 49, 96, 59, 36, 56, 102, 58, 38, 109, 130, 53, 137, 45, 106, 104, 42].map((value) => (
            <option key={value} value={value}>{value} m²</option>
            
          ))}
        </select>
        <br />

        <label>LotArea (m²):</label>
        <input
          type="number"
          name="LotArea"
          min="1000"
          max="20000"
          value={formData.LotArea}
          onChange={handleInputChange}
        />
        <br />

        <label>Genel Kalite (OverallQual):</label>
        <select
          name="OverallQual"
          value={formData.OverallQual}
          onChange={handleInputChange}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <option key={value} value={value}>
              {value} - {value === 1 ? 'Çok Kötü' : value === 2 ? 'Kötü' : value === 3 ? 'Orta' : value === 4 ? 'İyi' : value === 5 ? 'Çok İyi' : value === 6 ? 'Mükemmel' : value === 7 ? 'Çok Mükemmel' : value === 8 ? 'Lüks' : value === 9 ? 'Çok Lüks' : 'En Lüks'}
            </option>
          ))}
        </select>
        <br />

        <label>Genel Durum (OverallCond):</label>
        <select
          name="OverallCond"
          value={formData.OverallCond}
          onChange={handleInputChange}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value} - {value === 1 ? 'Çok Kötü' : value === 2 ? 'Kötü' : value === 3 ? 'Orta' : value === 4 ? 'İyi' : 'Çok İyi'}
            </option>
          ))}
        </select>
        <br />

        <label>Yapım Yılı (YearBuilt):</label>
        <input
          type="number"
          name="YearBuilt"
          min="1800"
          max="2025"
          value={formData.YearBuilt}
          onChange={handleInputChange}
        />
        <br />

        <label>Yenileme Yılı (YearRemodAdd):</label>
        <input
          type="number"
          name="YearRemodAdd"
          min="1900"
          max="2025"
          value={formData.YearRemodAdd}
          onChange={handleInputChange}
        />
        <br />

        <label>MSZoning:</label>
        <select
          name="MSZoning"
          value={formData.MSZoning}
          onChange={handleInputChange}
        >
          {['RL', 'RM', 'C (all)', 'FV'].map((value) => (
            <option key={value} value={value}>
              {value=== 'RL' ? 'Düşük Yoğunluklu' : value === 'RM' ? 'Orta Yoğunluklu' : value === 'C (all)' ? 'Ticari Alan' : value === 'FV' ? 'Su Baskını Riski': ''}
            </option>
          ))}
        </select>
        <br />

        <label>Cadde Türü (Street):</label>
        <select
          name="Street"
          value={formData.Street}
          onChange={handleInputChange}
        >
          {['Pave', 'Grvl'].map((value) => (
            <option key={value} value={value}>
              {value === 'Pave' ? 'Asfalt' : 'Çakıl'}
            </option>
          ))}
        </select>
        <br />

        <label>Lot Şekli (LotShape):</label>
        <select
          name="LotShape"
          value={formData.LotShape}
          onChange={handleInputChange}
        >
          {['Reg', 'IR1', 'IR2', 'IR3'].map((value) => (
            <option key={value} value={value}>
              {value === 'Reg' ? 'Düzgün' : value === 'IR1' ? 'Düzgün Olmayan 1' : value === 'IR2' ? 'Düzgün Olmayan 2' : 'Düzgün Olmayan 3'}
            </option>
          ))}
        </select>
        <br />

        <label>Toprak Konturu (LandContour):</label>
        <select
          name="LandContour"
          value={formData.LandContour}
          onChange={handleInputChange}
        >
          {['Lvl', 'Bnk', 'HLS', 'Low'].map((value) => (
            <option key={value} value={value}>
              {value === 'Lvl' ? 'Düz' : value === 'Bnk' ? 'Eğimli' : value === 'HLS' ? 'Yüksek' : 'Düşük'}
            </option>
          ))}
        </select>
        <br />

        <label>Yararlı Alt Yapı (Utilities):</label>
        <select
          name="Utilities"
          value={formData.Utilities}
          onChange={handleInputChange}
        >
          {['AllPub', 'NoSewr', 'NoSeWa', 'ELO'].map((value) => (
            <option key={value} value={value}>
              {value === 'AllPub' ? 'Tam Alt Yapı' : value === 'NoSewr' ? 'Kanalizasyon Yok' : value === 'NoSeWa' ? 'Kanalizasyon ve Su Yok' : 'Elektrik Yok'}
            </option>
          ))}
        </select>
        <br />

        <label>Lot Konfigürasyonu (LotConfig):</label>
        <select
          name="LotConfig"
          value={formData.LotConfig}
          onChange={handleInputChange}
        >
          {['Inside', 'Corner', 'CulDSac', 'FR2', 'FR3'].map((value) => (
            <option key={value} value={value}>
              {value === 'Inside' ? 'İç' : value === 'Corner' ? 'Köşe' : value === 'CulDSac' ? 'Dönüş Yeri' : value === 'FR2' ? 'İki Ön Cepheli' : 'Üç Ön Cepheli'}
            </option>
          ))}
        </select>
        <br />

        <label>Mahalle (Neighborhood):</label>
        <select
          name="Neighborhood"
          value={formData.Neighborhood}
          onChange={handleInputChange}
        >
          {['CollgCr', 'Veenker', 'Crawfor', 'NoRidge', 'Mitchel', 'Somerst', 'NWAmes', 'OldTown', 'BrkSide', 'Sawyer', 'NridgHt', 'NAmes', 'SawyerW', 'IDOTRR', 'MeadowV', 'Edwards', 'Timber', 'Gilbert', 'StoneBr', 'ClearCr', 'NPkVill', 'Blmngtn', 'BrDale', 'SWISU', 'Blueste'].map((value) => (
            <option key={value} value={value}>
                {value}
            </option>
          ))}
        </select>
        <br />

        <label>Bina Türü (BldgType):</label>
        <select
          name="BldgType"
          value={formData.BldgType}
          onChange={handleInputChange}
        >
          {['1Fam', '2fmCon', 'Duplex', 'Twnhs'].map((value) => (
            <option key={value} value={value}>
                {value}
            </option>
            ))}

        </select>
        <br />

        <label>Ev Tarzı (HouseStyle):</label>
        <select
          name="HouseStyle"
          value={formData.HouseStyle}
          onChange={handleInputChange}
        >
          {['2Story', '1Story', '1.5Fin', 'SLvl', '2.5Unf'].map((value) => (
            <option key={value} value={value}>
              {value === '2Story' ? 'İki Katlı' : value === '1Story' ? 'Tek Katlı' : value === '1.5Fin' ? '1.5 Katlı' : value === 'SLvl' ? 'Split Level' : '2.5 Katlı'}
            </option>
          ))}
        </select>
        <br />

        <button type="submit">Tahmin Et</button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {prediction && <div style={{ color: 'green', marginTop: '10px' }}>Tahmin Edilen Fiyat: {prediction} $</div>}

         {/* Açıklamalar bölümü */}
    <div style={{ marginTop: '20px', padding: '20px', borderTop: '1px solid #ccc' }}>
      <h3>Açıklamalar</h3>
      <p><strong>LotFrontage (m²):</strong> Bu alan, parselin ön yüzünü (yol kenarındaki genişlik) gösterir. Konutun yol ile bağlantısını ifade eder.</p>
      <p><strong>LotArea (m²):</strong> Arazinin toplam alanıdır. Bu, mülkün büyüklüğünü gösteren önemli bir parametredir.</p>
      <p><strong>Genel Kalite (OverallQual):</strong> Konutun genel yapısal kalitesini derecelendiren bir ölçüttür. 1 çok kötü, 10 ise en yüksek kalitedir.</p>
      <p><strong>Genel Durum (OverallCond):</strong> Konutun mevcut durumunu belirten bir derecelendirmedir. 1 çok kötü, 5 ise çok iyi durumdaki evleri ifade eder.</p>
      <p><strong>Yapım Yılı (YearBuilt):</strong> Konutun inşa edildiği yıldır. Bu, evin ne kadar eski olduğunu gösterir.</p>
      <p><strong>Yenileme Yılı (YearRemodAdd):</strong> Evin son yenileme tarihini belirtir.</p>
      <p><strong>MSZoning:</strong> Mülkün bulunduğu bölge türünü belirtir (örneğin: konut, ticaret, vb.).</p>
      <p><strong>Cadde Türü (Street):</strong> Yolu tipi belirtir: Asfalt (Pave) veya çakıl (Grvl).</p>
      <p><strong>Lot Şekli (LotShape):</strong> Arazinin şeklidir. Düzgün (Reg) veya farklı şekillerde olabilir. Numara arttıkça bozulma artar.</p>
      <p><strong>Toprak Konturu (LandContour):</strong> Arazinin topografyasını gösterir. Düz, eğimli veya yüksek olabilir.</p>
      <p><strong>Yararlı Alt Yapı (Utilities):</strong> Mülkün altyapı hizmetleri. Tam altyapı (AllPub) tüm gereksinimleri karşılar, diğerleri eksik altyapıyı belirtir.</p>
      <p><strong>Lot Konfigürasyonu (LotConfig):</strong> Arazinin konfigürasyonunu belirtir: iç, köşe, döner kavşak vb.</p>
      <p><strong>Mahalle (Neighborhood):</strong> College Creek: Üniversiteye yakın bir mahalle. Crawford: Tarihsel veya coğrafi olarak önemli bir mahalle. North Ridge: Kuzey yönünde yer alan bir sırt veya tepe bölgesi.
       Brookside: Küçük bir su yolu kenarında yerleşmiş bir mahalle. Sawyer: Eski bir orman veya marangozluk bölgesi. North Ridge Heights: Kuzey yönünde, daha yüksek bir alanda yer alır. 
       Iowa Department of Transportation Railroad: Demiryolu çevresindeki bir mahalle. Meadow View: Çayır veya açık alanlara bakan bir yer. New Park Village: Yeni yerleşim alanları ve yeşil alanlar içerir. 
       Brookdale: Küçük bir su yolu kenarındaki mahalle. Southwest Iowa State University: Üniversite çevresindeki bir bölge. </p>
       <p><strong>Bina Türü (BldgType):</strong>Single Family: Tek ailelik bağımsız konut. 2-Family Conjoined: İki aile için ortaklaşa yapılmış konut. 
       Duplex: Çift katlı, iki bağımsız konut birimi içeren bina. Townhouse: Sıra ev, bağlı evlerden oluşan yapı. </p>
       <p><strong>Ev Tarzı (HouseStyle):</strong> Konutun yapısal tarzı. Örneğin, tek katlı (1Story), iki katlı (2Story) vb.</p>
    </div>

    </div>
  );
}

export default App;
