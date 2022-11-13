const calcElasticCollision = (mA, mB, vAInitial, vBInitial) => ({
    vAFinal: (((mA - mB) / (mA + mB)) * vAInitial) + (((2 * mB) / (mA + mB)) * vBInitial),
    vBFinal: (((2 * mA) / (mA + mB)) * vAInitial) + (((mB - mA) / (mA + mB)) * vBInitial)
});