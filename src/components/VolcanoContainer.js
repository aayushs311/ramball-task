import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchVolcanosData } from '../redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Col, Form, Input, InputGroup, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function VolcanoContainer({ volcanoData, fetchVolcanosData }) {

  const [jsonData, setJsonData] = useState(volcanoData.volcanos);

  useEffect(() => {
    fetchVolcanosData();
    // setJsonData(volcanoData.volcanos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    setJsonData(volcanoData.volcanos);
  }, [volcanoData])

  const initialData = {
    lon1: "",
    lon2: "",
    lat1: "",
    lat2: "",
  }
  const [inputData, setInputData] = useState(initialData);

  const handleLonSubmitClick = (e) => {
    e.preventDefault();
    // let tempArr = volcanoData.volcanos;
    // console.log(tempArr);
    let arr = volcanoData.volcanos.filter((a) => { return a.properties.Longitude > inputData.lon1 && a.properties.Longitude < inputData.lon2 });
    setJsonData(arr)
    console.log(arr);
  }
  const handleLatSubmitClick = (e) => {
    e.preventDefault();
    // let tempArr = volcanoData.volcanos;
    // console.log(tempArr);
    let arr = volcanoData.volcanos.filter((a) => { return a.properties.Latitude > inputData.lat1 && a.properties.Latitude < inputData.lat2 });
    setJsonData(arr)
    console.log(arr);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    let obj = { ...inputData };
    obj[name] = value;
    setInputData(obj);

    if (e.target.value === '') {
      setJsonData(volcanoData.volcanos);
    }
  }

  const clearData = () => {
    setInputData(initialData);
    setJsonData(volcanoData.volcanos);
  }

  return volcanoData.loading ? (
    <h2>Loading</h2>
  ) : volcanoData.error ? (
    <h2>{volcanoData.error}</h2>
  ) : (
    <div className='main-dv'>
      <div className='form-div'>
        <InputGroup size="sm">
          <Form onSubmit={(e) => handleLonSubmitClick(e)} autoComplete="off">
            <Row>
              <Col md="4">
                <small className='fw-bold text-muted'>Longitude <sup className='text-danger'>*</sup></small>
                <Input type="text" name="lon1" placeholder='Min' value={inputData.lon1} onChange={handleChange} />
              </Col>
              <Col md="4">
                <small className='fw-bold text-muted'>Longitude <sup className='text-danger'>*</sup></small>
                <Input type="text" name="lon2" placeholder='Max' value={inputData.lon2} onChange={handleChange} />
              </Col>
              <Col md="1">
                <Button className='mt-4' color='primary' type='submit' disabled={(inputData.lon1 && inputData.lon2) === ""}><FontAwesomeIcon icon={faSearch} /></Button>
              </Col>
              <Col md="1">
                <Button className='mt-4' color='danger' type='button' onClick={clearData} disabled={(inputData.lon1 && inputData.lon2) === ""}>Clear</Button>
              </Col>
            </Row>
          </Form>
        </InputGroup>
        <InputGroup size="sm">
          <Form onSubmit={(e) => handleLatSubmitClick(e)} autoComplete="off">
            <Row>
              <Col md="4">
                <small className='fw-bold text-muted'>Latitude <sup className='text-danger'>*</sup></small>
                <Input type="text" name="lat1" placeholder='Min' value={inputData.lat1} onChange={handleChange} />
              </Col>
              <Col md="4">
                <small className='fw-bold text-muted'>Latitude <sup className='text-danger'>*</sup></small>
                <Input type="text" name="lat2" placeholder='Max' value={inputData.lat2} onChange={handleChange} />
              </Col>
              <Col md="1">
                <Button className='mt-4' color='primary' type='submit' disabled={(inputData.lat1 && inputData.lat2) === ""}><FontAwesomeIcon icon={faSearch} /></Button>
              </Col>
              <Col md="1">
                <Button className='mt-4' color='danger' type='button' onClick={clearData} disabled={(inputData.lat1 && inputData.lat2) === ""}>Clear</Button>
              </Col>
            </Row>
          </Form>
        </InputGroup>
      </div>
      < MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={true} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          jsonData &&
          jsonData.map(value => (
            <Marker
              key={value?.properties?.VolcanoID}
              position={[value?.properties?.Latitude, value?.properties?.Longitude]}>
              <Popup>
                <div>
                  <h2>{value?.properties?.V_Name} <br /> {value?.properties?.Country}.</h2>
                </div>
              </Popup>
            </Marker>
          ))
        }
      </MapContainer >
    </div>
  )
}

const mapStateToProps = state => {
  return {
    volcanoData: state.volcano
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchVolcanosData: () => dispatch(fetchVolcanosData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolcanoContainer)
