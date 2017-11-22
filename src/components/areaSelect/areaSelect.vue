<template>
    <div class="coo-area-select" v-clickoutside="handleClose">
        <div class="coo-area-display" @click="handleShow" :class="{none: !current.province.id}">
            <span v-if="current.province.id">{{ current.province.name }}</span>
            <span v-if="current.city.id">{{ current.city.name }}</span>
            <span v-if="current.country.id">{{ current.country.name }}</span>
            <span v-if="!current.province.id">请选择省 / 市 / 区 </span>
        </div>
        <div class="coo-area-mask" v-show="show"></div>
        <transition name="coo-area-fade">
            <div class="coo-area-body" v-show="show">
                <div class="coo-area-title">所在地区<button class="coo-area-close" @click="handleClose"><mt-icon type="clear"></mt-icon></button></div>
                <div class="coo-area-tab clearfix">
                    <span @click="handleTabProvince" class="coo-area-tabitem" :class="{active: tab === 'province'}">{{ selected.province.id ? selected.province.name : '请选择' }}</span>
                    <span @click="handleTabCity" class="coo-area-tabitem" :class="{active: tab === 'city'}" v-if="selected.province.id">{{ selected.city.id ? selected.city.name : '请选择' }}</span>
                    <span @click="handleTabCountry" class="coo-area-tabitem" :class="{active: tab === 'country'}" v-if="selected.city.id">{{ selected.country.id ? selected.country.name : '请选择' }}</span>
                    <button class="coo-area-close" @click="handleClose"><mt-icon type="clear"></mt-icon></button>
                </div>
                <div class="coo-area-list">
                    <dl class="province-list" v-show="tab==='province'">
                        <dd v-for="item in provinces" @click="handleSelectProvince(item)" :class="{active: parseInt(item.id) === parseInt(selected.province.id)}">{{ item.name }}</dd>
                    </dl>
                    <dl class="city-list" v-show="tab==='city'">
                        <dd v-for="item in cities" @click="handleSelectCity(item)" :class="{active: parseInt(item.id) === parseInt(selected.city.id)}">{{ item.name }}</dd>
                    </dl>
                    <dl class="country-list" v-show="tab==='country'">
                        <dd v-for="item in countries" @click="handleSelectCountry(item)" :class="{active: parseInt(item.id) === parseInt(selected.country.id)}">{{ item.name }}</dd>
                    </dl>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import Icon from '../icon/icon.vue';
    import {winScroll} from '../utils/dom';
    import {IsMobile} from '../utils/index';
    import Clickoutside from '../utils/clickoutside';
    let _area = {};
    export default {
        components: {
            mtIcon: Icon
        },
        directives: { Clickoutside },
        props: {
            province: Object,
            city: Object,
            country: Object,
        },
        data () {
            return {
                provinces: [],
                cities: [],
                countries: [],
                tab: 'province',
                selected: {
                    province: {},
                    city: {},
                    country: {}
                },
                current: {
                    province: {},
                    city: {},
                    country: {}
                },
                show: false
            };
        },
        methods: {
            handleSelectProvince (province) {
                this.tab = 'city';
                if (this.selected.province.id === province.id) {
                    return;
                }
                this.selected.city = {};
                this.selected.country = {};
                this.cities = [];
                this.countries = [];
                this.selected.province = province;
                let cities = _area[province.id].cities;
                for (let key in cities) {
                    this.cities.push({
                        id: key,
                        name: cities[key].name
                    });
                }
            },
            handleSelectCity (city) {
                this.tab = 'country';
                if (this.selected.city.id === city.id) {
                    return;
                }
                this.selected.country = {};
                this.countries = [];
                this.selected.city = city;
                let countries = _area[this.selected.province.id].cities[city.id].districts;
                for (let key in countries) {
                    this.countries.push({
                        id: key,
                        name: countries[key][0]
                    });
                }
            },
            handleSelectCountry (country) {
                this.show = false;
                if (this.selected.country.id === country.id) {
                    return;
                }
                this.selected.country = country;
                this.current = this.selected;
                this.$emit('select', this.selected);
                if (IsMobile) {
                    winScroll(true);
                }
            },
            handleTabProvince () {
                this.tab = 'province';
            },
            handleTabCity () {
                this.tab = 'city';
                if (!this.cities.length) {
                    let cities = _area[this.selected.province.id].cities;
                    for (let key in cities) {
                        this.cities.push({
                            id: key,
                            name: cities[key].name
                        });
                    }
                }
            },
            handleTabCountry () {
                this.tab = 'country';
                if (!this.countries.length) {
                    let countries = _area[this.selected.province.id].cities[this.selected.city.id].districts;
                    for (let key in countries) {
                        this.countries.push({
                            id: key,
                            name: countries[key][0]
                        });
                    }
                }
            },
            handleClose () {
                this.show = false;
                if (IsMobile) {
                    winScroll(true);
                }
            },
            handleShow () {
                this.show = true;
                if (IsMobile) {
                    winScroll(false);
                }
            }
        },
        mounted () {
            require.ensure([], () => {
                let AREA = require('./area');
                AREA.default.result.map((item, index) => {
                    _area = Object.assign({}, _area, item.provinces);
                });
                for (let key in _area) {
                    this.provinces.push({
                        id: key,
                        name: _area[key].name
                    });
                }

                this.selected.province = this.province;
                this.selected.city = this.city;
                this.selected.country = this.country;
                this.current = this.selected;
            });
        },
        created () {

        }
    };
</script>
<style lang="scss" src="./areaSelect.scss"></style>
