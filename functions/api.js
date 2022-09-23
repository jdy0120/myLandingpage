const admin = require('firebase-admin');
const db = admin.database();
const ref = db.ref('/');

// 상단 - 이메일 정보 랜딩
function landFromEmail (req, res) {
  const createdTime = Date.now();
  const userEmail = req.body.email;

  const resObj = {
    resultState: 1,
    data: req.body,
    result: 'ok'
  };

  ref.child('users').once("value", snapshot => {
    let isExistEmail = false;

    snapshot.forEach(childSnapshot => {
      const childEmail = childSnapshot.val().email;

      if (childEmail === userEmail) {
        isExistEmail = true;
      }
    });

    if (isExistEmail) {
        resObj.resultState = 0;
        resObj.result = '이메일이 이미 존재합니다';
        res.send(JSON.stringify(resObj));
    } else {
      const payload = {};
      payload[createdTime] = {
        createdTime,
        name: '',
        email: userEmail,
        phone: '',
        msg: ''
      };

      ref.child('users').update(payload);
      res.send(JSON.stringify(resObj));
    }
  });
}

exports.landFromEmail = landFromEmail;

// 하단 - Contact 정보 랜딩
function landFromContact (req, res) {
  const createdTime = Date.now();

  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPhone = req.body.phone;
  const userMsg = req.body.msg;

  const resObj = {
    resultState: 1,
    data: req.body,
    result: 'ok'
  };

  ref.child('users').once("value", snapshot => {
    let isExist = false;

    snapshot.forEach(childSnapshot => {
      const childEmail = childSnapshot.val().email;
      const childPhone = childSnapshot.val().phone;

      if (childEmail === userEmail || childPhone === userPhone) {
        isExist = true;
      }
    });

    if (isExist) {
        resObj.resultState = 0;
        resObj.result = '이미 정보가 존재합니다';
        res.send(JSON.stringify(resObj));
    } else {
      const payload = {};
      payload[createdTime] = {
        createdTime,
        name: userName,
        email: userEmail,
        phone: userPhone,
        msg: userMsg
      };

      ref.child('users').update(payload);
      res.send(JSON.stringify(resObj));
    }
  });
}

exports.landFromContact = landFromContact;

// 하단 고정 - 배너 정보 랜딩
function landFromBanner (req, res) {
  const createdTime = Date.now();

  const userName = req.body.name;
  const userPhone = req.body.phone;

  const resObj = {
    resultState: 1,
    data: req.body,
    result: 'ok'
  };

  ref.child('users').once("value", snapshot => {
    let isExistPhone = false;

    snapshot.forEach(childSnapshot => {
      const childPhone = childSnapshot.val().phone;

      if (childPhone === userPhone) {
        isExistPhone = true;
      }
    });

    if (isExistPhone) {
        resObj.resultState = 0;
        resObj.result = '이미 휴대폰 정보가 존재합니다';
        res.send(JSON.stringify(resObj));
    } else {
      const payload = {};
      payload[createdTime] = {
        createdTime,
        name: userName,
        email: '',
        phone: userPhone,
        msg: ''
      };

      ref.child('users').update(payload);
      res.send(JSON.stringify(resObj));
    }
  });
}

exports.landFromBanner = landFromBanner;
