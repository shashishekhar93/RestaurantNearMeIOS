/**
 * ============================================================
 * MENU ITEM CARD
 * ============================================================
 *
 * Displays a single menu item inside MenuScreen.
 *
 * Responsibilities:
 *
 * - Show item name
 * - Show description
 * - Show price
 * - Show discounted price when available
 * - Show vegetarian indicator
 * - Show spicy indicator
 * - Show featured indicator
 * - Show "+" button
 *
 * No API calls are made from this component.
 * ============================================================
 */

import React, {
  useCallback,
} from 'react';

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import AppText from '../../component/AppText/AppText';

import {
  Colors,
  Fonts,
  Radius,
  Spacing,
  Typography,
} from '../../theme';

import {MenuItem} from '../../api/services/menu/Menu';


// ============================================================
// PROPS
// ============================================================

type Props = {
  item: MenuItem;

  /**
   * Optional callback.
   *
   * We will use this later when the user presses "+" to
   * add an item to cart/order.
   */
  onAdd?: (
    item: MenuItem,
  ) => void;
};


// ============================================================
// COMPONENT
// ============================================================

const MenuItemCard = ({
  item,
  onAdd,
}: Props) => {

  // ==========================================================
  // ADD ITEM
  // ==========================================================

  const handleAdd = useCallback(() => {

    if (onAdd) {
      onAdd(item);
    }

  }, [
    item,
    onAdd,
  ]);


  // ==========================================================
  // PRICE
  // ==========================================================

  const hasDiscount =
    item.discountedPrice !== null &&
    item.discountedPrice !== undefined &&
    item.discountedPrice <
      item.price;


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <View
      style={[
        styles.card,
        !item.available &&
          styles.unavailableCard,
      ]}>

      {/* =====================================================
          LEFT CONTENT
      ===================================================== */}

      <View style={styles.content}>

        {/* ---------------------------------------------------
            ITEM NAME + VEG INDICATOR
        --------------------------------------------------- */}

        <View
          style={
            styles.nameRow
          }>

          <AppText
            numberOfLines={2}
            style={styles.itemName}>

            {item.itemName}

          </AppText>

          {item.veg && (
            <View
              style={styles.vegIndicator}>

              <View
                style={
                  styles.vegDot
                }
              />

            </View>
          )}

        </View>


        {/* ---------------------------------------------------
            FEATURED / SPICY LABELS
        --------------------------------------------------- */}

        {(item.featured ||
          item.spicy) && (

          <View
            style={
              styles.badgesRow
            }>

            {item.featured && (
              <View
                style={
                  styles.badge
                }>

                <AppText
                  style={
                    styles.badgeText
                  }>

                  FEATURED

                </AppText>

              </View>
            )}

            {item.spicy && (
              <View
                style={
                  styles.badge
                }>

                <AppText
                  style={
                    styles.badgeText
                  }>

                  SPICY

                </AppText>

              </View>
            )}

          </View>
        )}


        {/* ---------------------------------------------------
            DESCRIPTION
        --------------------------------------------------- */}

        {item.description ? (
          <AppText
            numberOfLines={3}
            style={
              styles.description
            }>

            {item.description}

          </AppText>
        ) : null}


        {/* ---------------------------------------------------
            PRICE
        --------------------------------------------------- */}

        <View
          style={styles.priceRow}>

          {hasDiscount ? (

            <>
              <AppText
                style={
                  styles.discountedPrice
                }>

                ${Number(
                  item.discountedPrice,
                ).toFixed(2)}

              </AppText>

              <AppText
                style={
                  styles.originalPrice
                }>

                ${Number(
                  item.price,
                ).toFixed(2)}

              </AppText>
            </>

          ) : (

            <AppText
              style={
                styles.price
              }>

              ${Number(
                item.price,
              ).toFixed(2)}

            </AppText>

          )}

        </View>


        {/* ---------------------------------------------------
            AVAILABILITY
        --------------------------------------------------- */}

        {!item.available && (
          <AppText
            style={
              styles.unavailableText
            }>

            Currently unavailable

          </AppText>
        )}

      </View>


      {/* =====================================================
          IMAGE + ADD BUTTON
      ===================================================== */}

      <View
        style={styles.rightContent}>

        {item.imageUrl ? (

          <Image
            source={{
              uri: item.imageUrl,
            }}
            resizeMode="cover"
            style={
              styles.itemImage
            }
          />

        ) : null}


        {/* ---------------------------------------------------
            ADD BUTTON
        --------------------------------------------------- */}

        {item.available && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={
              styles.addButton
            }
            onPress={
              handleAdd
            }>

            <AppText
              style={
                styles.addText
              }>

              +

            </AppText>

          </TouchableOpacity>
        )}

      </View>

    </View>
  );
};


// ============================================================
// EXPORT
// ============================================================

export default React.memo(
  MenuItemCard,
);


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // CARD
  // ==========================================================

  card: {
    flexDirection: 'row',

    backgroundColor:
      Colors.white,

    borderWidth: 1,
    borderColor:
      Colors.background500,

    borderRadius:
      Radius.xl,

    padding:
      Spacing.md,

    marginBottom:
      Spacing.md,

    minHeight: 150,
  },


  unavailableCard: {
    opacity: 0.55,
  },


  // ==========================================================
  // LEFT CONTENT
  // ==========================================================

  content: {
    flex: 1,

    paddingRight:
      Spacing.sm,
  },


  // ==========================================================
  // ITEM NAME
  // ==========================================================

  nameRow: {
    flexDirection: 'row',

    alignItems:
      'flex-start',
  },


  itemName: {
    flex: 1,

    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    lineHeight: 22,

    color:
      Colors.black,
  },


  // ==========================================================
  // VEGETARIAN INDICATOR
  // ==========================================================

  vegIndicator: {
    width: 18,
    height: 18,

    borderWidth: 1.5,
    borderColor:
      '#35A853',

    marginLeft:
      Spacing.xs,

    justifyContent:
      'center',

    alignItems:
      'center',
  },


  vegDot: {
    width: 7,
    height: 7,

    borderRadius: 3.5,

    backgroundColor:
      '#35A853',
  },


  // ==========================================================
  // BADGES
  // ==========================================================

  badgesRow: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    marginTop:
      Spacing.xs,
  },


  badge: {
    backgroundColor:
      '#FFF0F0',

    borderRadius:
      Radius.sm,

    paddingHorizontal:
      Spacing.xs,

    paddingVertical: 3,

    marginRight:
      Spacing.xs,
  },


  badgeText: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      9,

    color:
      '#C62828',
  },


  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  description: {
    marginTop:
      Spacing.sm,

    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    lineHeight: 19,

    color:
      Colors.neutral700,
  },


  // ==========================================================
  // PRICE
  // ==========================================================

  priceRow: {
    flexDirection: 'row',

    alignItems:
      'center',

    marginTop:
      Spacing.sm,
  },


  price: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.black,
  },


  discountedPrice: {
    fontFamily:
      Fonts.interBold,

    fontSize:
      Typography.body,

    color:
      Colors.black,

    marginRight:
      Spacing.sm,
  },


  originalPrice: {
    fontFamily:
      Fonts.interRegular,

    fontSize:
      Typography.small,

    color:
      Colors.neutral500,

    textDecorationLine:
      'line-through',
  },


  // ==========================================================
  // AVAILABILITY
  // ==========================================================

  unavailableText: {
    marginTop:
      Spacing.xs,

    fontFamily:
      Fonts.interMedium,

    fontSize:
      Typography.extraSmall,

    color:
      Colors.neutral500,
  },


  // ==========================================================
  // RIGHT SIDE
  // ==========================================================

  rightContent: {
    width: 96,

    justifyContent:
      'flex-start',

    alignItems:
      'flex-end',
  },


  itemImage: {
    width: 88,
    height: 88,

    borderRadius:
      Radius.lg,

    backgroundColor:
      Colors.background300,
  },


  // ==========================================================
  // ADD BUTTON
  // ==========================================================

  addButton: {
    position: 'absolute',

    right: -2,
    bottom: -2,

    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor:
      Colors.orangePrimary,

    justifyContent:
      'center',

    alignItems:
      'center',

    elevation: 3,

    shadowColor:
      '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.12,

    shadowRadius: 4,
  },


  addText: {
    color:
      Colors.white,

    fontFamily:
      Fonts.interBold,

    fontSize: 26,

    lineHeight: 28,
  },

});