import * as migration_20260705_023446_initial from './20260705_023446_initial';
import * as migration_20260705_024404_media_plugins from './20260705_024404_media_plugins';
import * as migration_20260705_033500_p14_collections from './20260705_033500_p14_collections';
import * as migration_20260705_042418_p14_globals_shell from './20260705_042418_p14_globals_shell';
import * as migration_20260705_044720_p14_globals_about_testimonios from './20260705_044720_p14_globals_about_testimonios';
import * as migration_20260705_045406_p14_global_reto from './20260705_045406_p14_global_reto';
import * as migration_20260705_050208_p14_global_home from './20260705_050208_p14_global_home';
import * as migration_20260705_050811_p14_global_diplomado from './20260705_050811_p14_global_diplomado';
import * as migration_20260705_051721_p14_home_hero_media_fields from './20260705_051721_p14_home_hero_media_fields';
import * as migration_20260705_052627_p14_footer_social_id_fix from './20260705_052627_p14_footer_social_id_fix';
import * as migration_20260705_062355_rework_pages_pagebuilder from './20260705_062355_rework_pages_pagebuilder';
import * as migration_20260705_174520_blog_collections from './20260705_174520_blog_collections';

export const migrations = [
  {
    up: migration_20260705_023446_initial.up,
    down: migration_20260705_023446_initial.down,
    name: '20260705_023446_initial',
  },
  {
    up: migration_20260705_024404_media_plugins.up,
    down: migration_20260705_024404_media_plugins.down,
    name: '20260705_024404_media_plugins',
  },
  {
    up: migration_20260705_033500_p14_collections.up,
    down: migration_20260705_033500_p14_collections.down,
    name: '20260705_033500_p14_collections',
  },
  {
    up: migration_20260705_042418_p14_globals_shell.up,
    down: migration_20260705_042418_p14_globals_shell.down,
    name: '20260705_042418_p14_globals_shell',
  },
  {
    up: migration_20260705_044720_p14_globals_about_testimonios.up,
    down: migration_20260705_044720_p14_globals_about_testimonios.down,
    name: '20260705_044720_p14_globals_about_testimonios',
  },
  {
    up: migration_20260705_045406_p14_global_reto.up,
    down: migration_20260705_045406_p14_global_reto.down,
    name: '20260705_045406_p14_global_reto',
  },
  {
    up: migration_20260705_050208_p14_global_home.up,
    down: migration_20260705_050208_p14_global_home.down,
    name: '20260705_050208_p14_global_home',
  },
  {
    up: migration_20260705_050811_p14_global_diplomado.up,
    down: migration_20260705_050811_p14_global_diplomado.down,
    name: '20260705_050811_p14_global_diplomado',
  },
  {
    up: migration_20260705_051721_p14_home_hero_media_fields.up,
    down: migration_20260705_051721_p14_home_hero_media_fields.down,
    name: '20260705_051721_p14_home_hero_media_fields',
  },
  {
    up: migration_20260705_052627_p14_footer_social_id_fix.up,
    down: migration_20260705_052627_p14_footer_social_id_fix.down,
    name: '20260705_052627_p14_footer_social_id_fix',
  },
  {
    up: migration_20260705_062355_rework_pages_pagebuilder.up,
    down: migration_20260705_062355_rework_pages_pagebuilder.down,
    name: '20260705_062355_rework_pages_pagebuilder',
  },
  {
    up: migration_20260705_174520_blog_collections.up,
    down: migration_20260705_174520_blog_collections.down,
    name: '20260705_174520_blog_collections'
  },
];
