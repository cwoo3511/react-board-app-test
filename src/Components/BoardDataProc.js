import React from 'react';
import {
  Redirect
} from "react-router-dom";

function createData(code, title, writer, date, content) {
  return { code, title, writer, date, content };
}

const rows = [
  createData('0001', 'Cupcake', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
  createData('0002', 'Donut', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
  createData('0003', 'Eclair', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
  createData('0004', 'Frozen yoghurt', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
  createData('0005', 'Gingerbread', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
  createData('0006', 'Honeycomb', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
  createData('0007', 'Ice cream sandwich', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
  createData('0008', 'Jelly Bean', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
  createData('0009', 'KitKat', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
  createData('0010', 'Lollipop', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
  createData('0011', 'Marshmallow', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
  createData('0012', 'Nougat', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
  createData('0013', 'Oreo', 'someone', new Date().toLocaleTimeString(), "~~contents~~"),
].sort((a, b) => (parseInt(a.code) < parseInt(b.code) ? 1 : -1));

const BoardDataProc = ({match, history, location}) => {
  const {type} = match.params;
  const state = location.state;

  let send;
  const writer = 'someone';
  const date = new Date().toLocaleTimeString();

  if (type === 'write') {
    const code = '00' + (parseInt(state.code) + 1);
    const board = createData(code, state.title, writer, date, state.content);
    rows.push(board);
    rows.sort((a, b) => (parseInt(a.code) < parseInt(b.code) ? 1 : -1));

    send = <Redirect to={{
                  pathname: '/main/boardList',
                  state: {
                    rows: rows,
                  }
            }}/>;
  } else if (type === 'update') {
    const board = createData(state.code, state.title, writer, date, state.content);
    rows[state.index] = board;

    send = <Redirect to={{
                  pathname: '/main/boardList',
                  state: {
                    rows: rows,
                  }
            }}/>;
  } else if (type === 'delete') {
    rows.splice(state.index, 1);

    send = <Redirect to={{
                  pathname: '/main/boardList',
                  state: {
                    rows: rows,
                  }
            }}/>;
  } else {

    send = <Redirect to={{
                  pathname: '/main/boardList',
                  state: {
                    rows: rows,
                  }
            }}/>;
  }

  return (
    <div>
      {send}
    </div>
  );
};

export default BoardDataProc;