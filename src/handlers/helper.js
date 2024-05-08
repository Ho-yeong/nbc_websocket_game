import { getUsers, removeUser } from '../models/user.model.js';
import { getGameAssets } from '../init/assets.js';
import { getStage, setStage } from '../models/stage.model.js';

export const handleConnection = (socket, userUUID) => {
  console.log(`New user connected: ${userUUID} with socket ID ${socket.id}`);
  console.log('Current users:', getUsers());

  const { stages } = getGameAssets();
  setStage(userUUID, stages.data[0].id);
  console.log('Stage:', getStage(userUUID));

  socket.emit('connection', { uuid: userUUID });
};

export const handleDisconnect = (socket, uuid) => {
  removeUser(socket.id); // 사용자 삭제
  console.log(`User disconnected: ${socket.id}`);
  console.log('Current users:', getUsers());
};
