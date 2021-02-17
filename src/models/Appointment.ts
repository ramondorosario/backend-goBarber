import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';

/**
 * Configurações arquivo tsconfig.json
 * Habilitar "experimentalDecorators" e "emitDecoratorMetadata"
 * Desabilitar "strictPropertyInitialization"
 */

import { User } from './User';

@Entity('appointments')
export class Appointment {
	@PrimaryGeneratedColumn('uuid')
	id: String;

	@Column()
	provider_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'provider_id' })
	provider: User;

	@Column('time with time zone')
	date: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
