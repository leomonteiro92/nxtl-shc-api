/**
 * 
 * @param {*} sequelize 
 * @param {*} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    const AuditEvent = sequelize.define('AuditEvent', {
        action: {
            allowNull: false,
            type: DataTypes.ENUM('CREATE', 'UPDATE', 'DELETE')
        },
        datetime: {
            allowNull: false,
            type: DataTypes.DATE
        },
        entity: {
            allowNull: false,
            type: DataTypes.STRING
        },
        entityId: {
            allowNull: false,
            field: 'entity_id',
            type: DataTypes.INTEGER
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, { 
        tableName: 'audit_events',
        underscored: true
    });

    return AuditEvent;
};