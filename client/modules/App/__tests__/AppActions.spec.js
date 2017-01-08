import test from 'ava';
import { actionTest } from 'redux-ava';
import { SET_MESSAGE, setMessage } from '../AppActions';

test(
  'should return the correct type for setMessage',
  actionTest(setMessage, null, { type: SET_MESSAGE, message: null }),
);
