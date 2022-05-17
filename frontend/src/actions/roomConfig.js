export const roomConfig = (numberOfQs,subject,difficulty) => {

    let roomConfig = {
        numberOfQs: numberOfQs,
        difficulty: difficulty,
        subject: subject,
    }

    return{
        type: "ROOM_CONFIG",
        payload: roomConfig
    }
};


