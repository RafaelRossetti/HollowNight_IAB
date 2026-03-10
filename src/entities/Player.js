import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setGravityY(1200);
        this.body.setCollideWorldBounds(true);

        // Core parameters (HK style)
        this.speed = 360;
        this.jumpForce = -600;
        this.isDashing = false;
        this.canDash = true;

        // Fixed keys
        this.zKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        // To implement: Variable jump, Coyote time, etc.
    }

    update(cursors) {
        if (this.isDashing) return;

        if (cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.setFlipX(true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.speed);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }

        if (cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(this.jumpForce);
        }

        // Check for Dash (using Z key)
        if (Phaser.Input.Keyboard.JustDown(this.zKey) && this.canDash) {
            this.dash();
        }
    }

    dash() {
        this.isDashing = true;
        this.canDash = false;

        const dashVelocity = this.flipX ? -800 : 800;
        this.setVelocity(dashVelocity, 0);
        this.body.allowGravity = false;

        this.scene.time.delayedCall(200, () => {
            this.isDashing = false;
            this.body.allowGravity = true;
            this.setVelocityX(0);
        });

        this.scene.time.delayedCall(1000, () => {
            this.canDash = true;
        });
    }
}
